use crate::models;
use rusqlite::{params, Connection, Statement};
use std::collections::VecDeque;

fn select(stmt: &mut Statement) -> rusqlite::Result<VecDeque<models::InputParameter>> {
    let input_parameters_result = stmt.query_map(rusqlite::params![], |row| {
        Ok(models::InputParameter {
            id: row.get(0)?,
            layer_id: row.get(1)?,
            name: row.get(2)?,
        })
    })?;
    let input_parameters_result: Vec<_> = input_parameters_result.collect();
    let mut input_parameters = VecDeque::<models::InputParameter>::new();
    for input_parameter_result in input_parameters_result {
        match input_parameter_result {
            Ok(input_parameter) => input_parameters.push_back(input_parameter),
            Err(error) => {
                return Err(error);
            }
        }
    }
    Ok(input_parameters)
}

pub fn get_by_id(id: i64, connection_str: &str) -> rusqlite::Result<models::InputParameter> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare(&format!("SELECT * FROM input_parameter WHERE id = {id}"))?;
    let input_parameters = select(&mut stmt)?;
    Ok(input_parameters[0].to_owned())
}

pub fn get_all(connection_str: &str) -> rusqlite::Result<Vec<models::InputParameter>> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT * FROM input_parameter")?;
    let input_parameters = select(&mut stmt)?.into_iter().collect();
    Ok(input_parameters)
}

pub fn create(
    input_parameter: &mut models::InputParameter,
    connection_str: &str,
) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("INSERT INTO input_parameter (layer_id, name) VALUES (?, ?)")?;
    stmt.execute(rusqlite::params![
        &input_parameter.layer_id,
        &input_parameter.name,
    ])?;

    let new_id = conn.last_insert_rowid();
    input_parameter.id = new_id;

    Ok(())
}

pub fn update(
    input_parameter: &models::InputParameter,
    connection_str: &str,
) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("UPDATE input_parameter SET name = ? WHERE id = ?")?;
    stmt.execute(rusqlite::params![
        &input_parameter.name,
        &input_parameter.id
    ])?;

    Ok(())
}

pub fn remove_by_id(id: i64, connection_str: &str) -> rusqlite::Result<()> {
    let mut conn = Connection::open(connection_str).unwrap();
    let transaction = conn.transaction()?;
    let result = {
        let layer_id: i64 = transaction.query_row(
            "SELECT layer_id FROM input_parameter WHERE id = ?",
            params![&id],
            |row| row.get(0),
        )?;

        let input_parameter_number: i64 = transaction.query_row(
            "SELECT COUNT(*) FROM input_parameter WHERE layer_id = ?",
            params![&layer_id],
            |row| row.get(0),
        )?;

        if input_parameter_number == 1 {
            transaction.execute("DELETE FROM output_value WHERE id IN (SELECT output_value.id FROM output_value LEFT JOIN output_parameter ON output_value.output_parameter_id = output_parameter.id WHERE output_parameter.layer_id = ?)", params![&layer_id])?;
        } else {
            let deleting_input_value_number: i64 = transaction.query_row(
                "SELECT COUNT(*) FROM input_value WHERE input_value.input_parameter_id = ?",
                params![&id],
                |row| row.get(0),
            )?;

            if deleting_input_value_number > 0 {
                let mut stmt =
                transaction.prepare("SELECT output_value.id, output_value.input_value_ids FROM output_value LEFT JOIN output_parameter ON output_value.output_parameter_id = output_parameter.id WHERE output_parameter.layer_id = ?")?;
                let mut output_value_rows = stmt.query(rusqlite::params![&layer_id])?;
                let mut output_values = Vec::<(i64, String)>::new();
                while let Some(row) = output_value_rows.next()? {
                    output_values.push((row.get(0)?, row.get(1)?));
                }
                let saving_input_value_id: i64 = transaction.query_row(
                    "SELECT id FROM input_value WHERE input_parameter_id = ? ORDER BY id LIMIT 1",
                    params![&id],
                    |row| row.get(0),
                )?;
                let mut deleting_output_value_ids = Vec::<i64>::new();

                for (output_value_id, mut input_value_ids) in output_values {
                    if input_value_ids.contains(format!("|{}|", saving_input_value_id).as_str()) {
                        let input_value_ids = input_value_ids
                            .replace(format!("|{}|", saving_input_value_id).as_str(), "");
                        transaction.execute(
                            "UPDATE output_value SET input_value_ids = ? WHERE id = ?",
                            params![&input_value_ids, &output_value_id],
                        )?;
                    } else {
                        deleting_output_value_ids.push(output_value_id);
                    }
                }
                let deleting_output_value_ids: Vec<String> = deleting_output_value_ids
                    .iter()
                    .map(|output_value| output_value.to_string())
                    .collect();

                let mut stmt = transaction.prepare(
                    format!(
                        "DELETE FROM output_value WHERE id IN ({})",
                        deleting_output_value_ids.join(", ")
                    )
                    .as_str(),
                )?;
                stmt.execute(params![])?;
            }
        }

        transaction.execute("DELETE FROM input_parameter WHERE id = ?", params![&id])?;
        Ok(())
    };
    match result {
        Ok(_) => transaction.commit(),
        Err(e) => {
            transaction.rollback()?;
            Err(e)
        }
    }
}

pub fn exists(id: i64, connection_str: &str) -> rusqlite::Result<bool> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT EXISTS(SELECT 1 FROM input_parameter WHERE id = ?)")?;
    let exists: bool = stmt.query_row(params![id], |row| row.get(0))?;
    Ok(exists)
}
