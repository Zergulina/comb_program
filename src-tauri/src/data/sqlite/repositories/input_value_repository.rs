use rusqlite::{Connection, Statement, params};
use std::collections::VecDeque;
use crate::models;

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
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("INSERT INTO input_value (input_parameter_id, value) VALUES (?, ?)")?;
    stmt.execute(rusqlite::params![
        &input_value.input_parameter_id,
        &input_value.value
    ])?;

    let new_id = conn.last_insert_rowid();
    input_value.id = new_id;    
    
    Ok(())
}

pub fn update(input_value: &models::InputValue, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("UPDATE input_value SET value = ? WHERE id = ?")?;
    stmt.execute(rusqlite::params![
        &input_value.value,
        &input_value.id
    ])?;

    Ok(())
}

pub fn remove_by_id(id: i64, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    conn.execute("DELETE FROM input_value WHERE id = ?", &[&id])?;
    Ok(())
}

pub fn exists(id: i64, connection_str: &str) -> rusqlite::Result<bool> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT EXISTS(SELECT 1 FROM input_value WHERE id = ?1)")?;
    let exists: bool = stmt.query_row(params![id], |row| row.get(0))?;
    Ok(exists)
}