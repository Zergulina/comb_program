use rusqlite::{Connection, Statement, params};
use std::collections::VecDeque;
use crate::models;

fn select(stmt: &mut Statement) -> rusqlite::Result<VecDeque<models::OutputValue>> {
    let output_values_result = stmt.query_map(rusqlite::params![], |row| {
        Ok(models::OutputValue {
            input_value_ids_hash: row.get(0)?,
            output_parameter_id: row.get(1)?,
            value: row.get(2)?,
        })
    })?;
    let output_values_result: Vec<_> = output_values_result.collect();
    let mut output_values = VecDeque::<models::OutputValue>::new();
    for output_value_result in output_values_result {
        match output_value_result {
            Ok(output_value) => output_values.push_back(output_value),
            Err(error) => {
                return Err(error);
            }
        }
    }
    Ok(output_values)
}

pub fn get_by_id(input_value_ids_hash: i64, output_parameter_id: i64, connection_str: &str) -> rusqlite::Result<models::OutputValue> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare(&format!("SELECT * FROM output_value WHERE input_value_ids_hash = {input_value_ids_hash} AND output_parameter_id = {output_parameter_id}"))?;
    let output_values = select(&mut stmt)?;
    Ok(output_values[0].to_owned())
}

pub fn get_all(connection_str: &str) -> rusqlite::Result<Vec<models::OutputValue>> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT * FROM output_value")?;
    let input_values = select(&mut stmt)?.into_iter().collect();
    Ok(input_values)
}

pub fn create(output_value: &mut models::OutputValue, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("INSERT INTO output_value (input_value_ids_hash, output_parameter_id, value) VALUES (?, ?, ?)")?;
    stmt.execute(rusqlite::params![
        &output_value.input_value_ids_hash,
        &output_value.output_parameter_id,
        &output_value.value
    ])?;
    
    Ok(())
}

pub fn update(output_value: &models::OutputValue, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("UPDATE output_value SET value = ? WHERE input_value_ids_hash = ? AND output_parameter_id = ?")?;
    stmt.execute(rusqlite::params![
        &output_value.value,
        &output_value.input_value_ids_hash,
        &output_value.output_parameter_id,
    ])?;

    Ok(())
}

pub fn remove_by_id(input_value_ids_hash: i64, output_parameter_id: i64, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    conn.execute("DELETE FROM output_value WHERE input_value_ids_hash = ? AND output_parameter_id = ?", &[&input_value_ids_hash, &output_parameter_id])?;
    Ok(())
}

pub fn exists(input_value_ids_hash: i64, output_parameter_id: i64, connection_str: &str) -> rusqlite::Result<bool> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT EXISTS(SELECT 1 FROM output_value WHERE input_value_ids_hash = ?1 AND output_parameter_id = ?2)")?;
    let exists: bool = stmt.query_row(params![input_value_ids_hash, output_parameter_id], |row| row.get(0))?;
    Ok(exists)
}