use crate::{dtos::output_value_dtos, models};
use rusqlite::{params, Connection, Statement};
use std::{collections::VecDeque, fmt::format};

fn select(stmt: &mut Statement) -> rusqlite::Result<VecDeque<models::InputValue>> {
    let input_parameters_result = stmt.query_map(rusqlite::params![], |row| {
        Ok(models::InputValue {
            id: row.get(0)?,
            input_parameter_id: row.get(1)?,
            value: row.get(2)?,
        })
    })?;
    let input_parameters_result: Vec<_> = input_parameters_result.collect();
    let mut input_parameters = VecDeque::<models::InputValue>::new();
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

pub fn get_by_id(id: i64, connection_str: &str) -> rusqlite::Result<models::InputValue> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare(&format!("SELECT * FROM input_value WHERE id = {id}"))?;
    let input_values = select(&mut stmt)?;
    Ok(input_values[0].to_owned())
}

pub fn get_all(connection_str: &str) -> rusqlite::Result<Vec<models::InputValue>> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT * FROM input_value")?;
    let input_values = select(&mut stmt)?.into_iter().collect();
    Ok(input_values)
}

pub fn create(input_value: &mut models::InputValue, connection_str: &str) -> rusqlite::Result<()> {
    let mut conn = Connection::open(connection_str).unwrap();
    let transaction = conn.transaction()?;
    let result = {
        let mut stmt = transaction
            .prepare("INSERT INTO input_value (input_parameter_id, value) VALUES (?, ?)")?;
        stmt.execute(rusqlite::params![
            &input_value.input_parameter_id,
            &input_value.value
        ])?;

        let new_input_value_id = transaction.last_insert_rowid();

        let number_of_input_values: i64 = transaction.query_row(
            "SELECT COUNT(*) FROM input_value WHERE input_parameter_id = ?",
            params![&input_value.input_parameter_id],
            |row| row.get(0),
        )?;

        let layer_id: i64 = transaction.query_row(
            "SELECT layer_id FROM input_parameter WHERE id = ?",
            params![&input_value.input_parameter_id],
            |row| row.get(0),
        )?;

        let mut stmt = transaction.prepare("SELECT output_value.id, output_value.input_value_ids, output_value.output_parameter_id FROM output_value LEFT JOIN output_parameter ON output_value.output_parameter_id = output_parameter.id WHERE output_parameter.layer_id = ?")?;
        let mut output_values_rows = stmt.query(rusqlite::params![&layer_id])?;

        let mut output_values = Vec::<(i64, String, i64)>::new();
        while let Some(row) = output_values_rows.next()? {
            output_values.push((row.get(0)?, row.get(1)?, row.get(2)?));
        }

        if output_values.len() == 0 {
            let mut stmt =
                transaction.prepare("SELECT id FROM output_parameter WHERE layer_id = ?")?;
            let mut output_parameter_id_rows = stmt.query(rusqlite::params![&layer_id])?;
            let mut output_parameter_ids = Vec::<i64>::new();
            while let Some(row) = output_parameter_id_rows.next()? {
                output_parameter_ids.push(row.get(0)?);
            }

            for output_parameter_id in output_parameter_ids {
                let mut stmt = transaction.prepare("INSERT INTO output_value (output_parameter_id, input_value_ids, value) VALUES (?, ?, ?)")?;
                stmt.execute(params![
                    &output_parameter_id,
                    format!("|{}|", &new_input_value_id),
                    ""
                ])?;
            }
        } else {
            if number_of_input_values == 1 {
                let mut stmt = transaction
                    .prepare("UPDATE output_value SET input_value_ids = ? WHERE id = ?")?;
                for (output_value_id, input_value_ids, _) in output_values {
                    let mut input_value_ids: Vec<i64> = input_value_ids
                        .split('|')
                        .filter(|s| !s.is_empty())
                        .map(|s| s.parse::<i64>().unwrap())
                        .collect();
                    input_value_ids.push(new_input_value_id);
                    input_value_ids.sort();
                    let input_value_ids = input_value_ids
                        .iter()
                        .map(|n| n.to_string())
                        .collect::<Vec<String>>()
                        .join("||");
                    stmt.execute(params![format!("|{input_value_ids}|"), &output_value_id])?;
                }
            } else {
                let mut input_value_id_to_replace: i64 =  transaction.query_row("SELECT input_value.id FROM input_value LEFT JOIN input_parameter ON input_value.input_parameter_id = input_parameter.id WHERE input_parameter.layer_id = ?  AND  input_value.id != ? AND input_parameter.id == ? LIMIT 1", params![&layer_id, &new_input_value_id,  &input_value.input_parameter_id], |row| row.get(0))?;

                for (_, mut input_value_ids, output_parameter_id) in output_values {
                    if !input_value_ids
                        .contains(format!("|{}|", &input_value_id_to_replace).as_str())
                    {
                        continue;
                    }
                    let input_value_ids = input_value_ids.replace(
                        format!("|{}|", &input_value_id_to_replace).as_str(),
                        format!("|{}|", &new_input_value_id).as_str(),
                    );
                    let mut input_value_ids: Vec<i64> = input_value_ids
                        .split('|')
                        .filter(|s| !s.is_empty())
                        .map(|s| s.parse::<i64>().unwrap())
                        .collect();
                    input_value_ids.sort();
                    let input_value_ids = input_value_ids
                        .iter()
                        .map(|n| n.to_string())
                        .collect::<Vec<String>>()
                        .join("||");
                    let mut stmt = transaction.prepare("INSERT INTO output_value (output_parameter_id, input_value_ids, value) VALUES (?, ?, ?)")?;
                    stmt.execute(params![
                        &output_parameter_id,
                        format!("|{input_value_ids}|"),
                        ""
                    ])?;
                }
            }
        }
        input_value.id = new_input_value_id;
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

pub fn update(input_value: &models::InputValue, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("UPDATE input_value SET value = ? WHERE id = ?")?;
    stmt.execute(rusqlite::params![&input_value.value, &input_value.id])?;

    Ok(())
}

pub fn remove_by_id(id: i64, connection_str: &str) -> rusqlite::Result<()> {
    let mut conn = Connection::open(connection_str).unwrap();
    let transaction = conn.transaction()?;
    let result: Result<(), rusqlite::Error> = {
        let input_parameter_id: i64 = transaction.query_row(
            "SELECT input_parameter_id FROM input_value WHERE id = ? LIMIT 1",
            params![&id],
            |row| row.get(0),
        )?;
        transaction.execute("DELETE FROM input_value WHERE id = ?", params![&id])?;
        let input_values_number: i64 = transaction.query_row(
            "SELECT COUNT(*) FROM input_value WHERE input_value.input_parameter_id = ?",
            params![&input_parameter_id],
            |row| row.get(0),
        )?;

        if input_values_number > 0 {
            transaction.execute(
                format!(
                    "DELETE FROM output_value WHERE input_value_ids LIKE '%|{}|%'",
                    id
                )
                .as_str(),
                params![],
            );
        } else {
            let layer_id: i64 = transaction.query_row(
                "SELECT layer_id FROM input_parameter WHERE id = ?",
                params![&input_parameter_id],
                |row| row.get(0),
            )?;

            let total_input_values_number: i64 = transaction.query_row(
                "SELECT COUNT(*) FROM input_value LEFT JOIN input_parameter ON input_value.input_parameter_id = input_parameter.id WHERE input_parameter.layer_id = ?",
                params![&layer_id],
                |row| row.get(0),
            )?;

            if total_input_values_number == 0 {
                transaction.execute(
                    format!(
                        "DELETE FROM output_value WHERE input_value_ids LIKE '|{}|'",
                        id
                    )
                    .as_str(),
                    params![],
                );
            }
            {
                let mut stmt = transaction.prepare("SELECT output_value.id, output_value.input_value_ids FROM output_value LEFT JOIN output_parameter ON output_value.output_parameter_id = output_parameter.id WHERE output_parameter.layer_id = ?")?;
                let mut output_values_rows = stmt.query(rusqlite::params![&layer_id])?;

                let mut output_values = Vec::<(i64, String)>::new();
                while let Some(row) = output_values_rows.next()? {
                    output_values.push((row.get(0)?, row.get(1)?));
                }

                for (output_value_id, mut input_value_ids) in output_values {
                    let input_value_ids = input_value_ids.replace(format!("|{}|", id).as_str(), "");
                    let mut stmt = transaction
                        .prepare("UPDATE output_value SET input_value_ids = ? WHERE id = ?")?;
                    stmt.execute(rusqlite::params![&input_value_ids, &output_value_id])?;
                }
            }
        }

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
    let mut stmt = conn.prepare("SELECT EXISTS(SELECT 1 FROM input_value WHERE id = ?1)")?;
    let exists: bool = stmt.query_row(params![id], |row| row.get(0))?;
    Ok(exists)
}
