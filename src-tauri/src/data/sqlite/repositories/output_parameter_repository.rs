use crate::models;
use rusqlite::{params, Connection, Statement};
use std::{collections::VecDeque, fmt::format};

pub fn select(stmt: &mut Statement) -> rusqlite::Result<VecDeque<models::OutputParameter>> {
    let output_parameters_result = stmt.query_map(rusqlite::params![], |row| {
        Ok(models::OutputParameter {
            id: row.get(0)?,
            layer_id: row.get(1)?,
            name: row.get(2)?,
        })
    })?;
    let output_parameters_result: Vec<_> = output_parameters_result.collect();
    let mut output_parameters = VecDeque::<models::OutputParameter>::new();
    for output_parameter_result in output_parameters_result {
        match output_parameter_result {
            Ok(output_parameter) => output_parameters.push_back(output_parameter),
            Err(error) => {
                return Err(error);
            }
        }
    }
    Ok(output_parameters)
}

pub fn get_by_id(id: i64, connection_str: &str) -> rusqlite::Result<models::OutputParameter> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare(&format!("SELECT * FROM output_parameter WHERE id = {id})"))?;
    let output_parameters = select(&mut stmt)?;
    Ok(output_parameters[0].to_owned())
}

pub fn get_all(connection_str: &str) -> rusqlite::Result<Vec<models::OutputParameter>> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT * FROM output_parameter")?;
    let output_parameters: Vec<models::OutputParameter> = select(&mut stmt)?.into_iter().collect();
    Ok(output_parameters)
}

pub fn create(
    output_parameter: &mut models::OutputParameter,
    connection_str: &str,
) -> rusqlite::Result<()> {
    let mut conn = Connection::open(connection_str).unwrap();
    let transaction = conn.transaction()?;
    let result = {

        let mut stmt =
            transaction.prepare("INSERT INTO output_parameter (layer_id, name) VALUES (?, ?)")?;
        stmt.execute(rusqlite::params![
            &output_parameter.layer_id,
            &output_parameter.name,
        ])?;

        let new_output_parameter_id = transaction.last_insert_rowid();

        let mut stmt =
            transaction.prepare("SELECT id FROM input_parameter WHERE layer_id = ? ORDER BY id")?;
        let mut input_parameter_rows = stmt.query(params![&output_parameter.layer_id])?;

        let mut input_parameter_ids = Vec::<i64>::new();
        while let Some(row) = input_parameter_rows.next()? {
            input_parameter_ids.push(row.get(0)?);
        }

        let mut input_values_ids = Vec::<Vec<i64>>::new();

        for input_parametr_id in input_parameter_ids.iter() {
            input_values_ids.push(Vec::<i64>::new());
            let length = input_values_ids.len();
            let mut stmt = transaction
                .prepare("SELECT id FROM input_value WHERE input_parameter_id = ? ORDER BY id")?;
            let mut input_parameter_rows = stmt.query(params![input_parametr_id])?;
            while let Some(row) = input_parameter_rows.next()? {
                input_values_ids[length - 1].push(row.get(0)?);
            }
        }

        if input_values_ids.len() != 0 {
            let input_values_ids = combinations(&input_values_ids);
            for input_values_ids_single_parameter in input_values_ids.iter() {
                let input_values_ids_strings: Vec<_> = input_values_ids_single_parameter
                    .iter()
                    .map(|id| format!("|{}|", id))
                    .collect();
                let mut stmt: Statement<'_> = transaction
                .prepare("INSERT INTO output_value (output_parameter_id, input_value_ids, value) VALUES (?, ?, ?)")?;
                stmt.execute(rusqlite::params![
                    &new_output_parameter_id,
                    &input_values_ids_strings.join(""),
                    ""
                ])?;
            }
        }
        output_parameter.id = new_output_parameter_id;
        Ok(())
    };

    fn combinations(v: &Vec<Vec<i64>>) -> Vec<Vec<i64>> {
        let mut result = vec![]; 
        let mut current_combination = vec![]; 


        fn _combinations(
            v: &Vec<Vec<i64>>,
            current_combination: &mut Vec<i64>,
            i: usize,
            result: &mut Vec<Vec<i64>>,
        ) {
            if i == v.len() {
                let mut new_vec = vec![];
                for j in 0..current_combination.len() {
                    new_vec.push(current_combination[j]);
                }
                result.push(new_vec);
            } else {
                for j in 0..v[i].len() {
                    current_combination.push(v[i][j]);
                    _combinations(v, current_combination, i + 1, result); 
                    current_combination.pop();
                }
            }
        }

        _combinations(v, &mut current_combination, 0, &mut result);

        result 
    }

    match result {
        Ok(_) => transaction.commit(),
        Err(e) => {
            transaction.rollback()?;
            Err(e)
        }
    }
}

pub fn update(
    output_parameter: &models::OutputParameter,
    connection_str: &str,
) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("UPDATE output_parameter SET name = ? WHERE id = ?")?;
    stmt.execute(rusqlite::params![
        &output_parameter.name,
        &output_parameter.id
    ])?;

    Ok(())
}

pub fn remove_by_id(id: i64, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    conn.execute("DELETE FROM output_parameter WHERE id = ?", &[&id])?;
    Ok(())
}

pub fn exists(id: i64, connection_str: &str) -> rusqlite::Result<bool> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT EXISTS(SELECT 1 FROM output_parameter WHERE id = ?1)")?;
    let exists: bool = stmt.query_row(params![id], |row| row.get(0))?;
    Ok(exists)
}
