use rusqlite::{Connection, Statement, params, ToSql};
use std::collections::VecDeque;
use crate::models::{self, OutputValue};

fn select(stmt: &mut Statement) -> rusqlite::Result<VecDeque<models::OutputValue>> {
    let output_values_result = stmt.query_map(rusqlite::params![], |row| {
        Ok(models::OutputValue {
            id: row.get(0)?,
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

pub fn get_by_output_parameter_id_and_value_ids(output_parameter_id: i64, input_value_ids: Vec<i64>, connection_str: &str) -> rusqlite::Result<models::OutputValue> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare(&format!(
        "SELECT ov.id, ov.value
         FROM output_value ov
         JOIN input_output_value iov ON ov.id = iov.output_value_id
         WHERE ov.output_parameter_id = ?
         AND iov.input_value_id IN ({})
         GROUP BY ov.id, ov.value
         HAVING COUNT(DISTINCT iov.input_value_id) = {}",
        input_value_ids.iter().map(|_| "?").collect::<Vec<_>>().join(","),
        input_value_ids.len()
    ))?;

    let params: Vec<&dyn ToSql> = std::iter::once(&output_parameter_id as &dyn ToSql)
    .chain(input_value_ids.iter().map(|id| id as &dyn ToSql))
    .collect();

    let mut rows = stmt.query(params.as_slice())?;

    let row = rows.next().unwrap().unwrap();

    let id: i64 = row.get(0)?;
    let value: String = row.get(1)?;

    Ok(OutputValue {id: id, output_parameter_id: output_parameter_id, value: value})
}

pub fn get_by_id(id: i64, connection_str: &str) -> rusqlite::Result<models::OutputValue> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare(&format!("SELECT * FROM output_value WHERE id = {id}"))?;
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
    let mut stmt = conn.prepare("INSERT INTO output_value (output_parameter_id, value) VALUES (?, ?)")?;
    stmt.execute(rusqlite::params![
        &output_value.output_parameter_id,
        &output_value.value
    ])?;
    
    Ok(())
}

pub fn update(output_value: &models::OutputValue, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("UPDATE output_value SET value = ? WHERE id = ?")?;
    stmt.execute(rusqlite::params![
        &output_value.value,
        &output_value.id,
    ])?;

    Ok(())
}

pub fn remove_by_id(id: i64, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    conn.execute("DELETE FROM output_value WHERE id = ?", &[&id])?;
    Ok(())
}

// pub fn exists(input_value_ids_hash: i64, output_parameter_id: i64, connection_str: &str) -> rusqlite::Result<bool> {
//     let conn = Connection::open(connection_str).unwrap();
//     let mut stmt = conn.prepare("SELECT EXISTS(SELECT 1 FROM output_value WHERE input_value_ids_hash = ?1 AND output_parameter_id = ?2)")?;
//     let exists: bool = stmt.query_row(params![input_value_ids_hash, output_parameter_id], |row| row.get(0))?;
//     Ok(exists)
// }