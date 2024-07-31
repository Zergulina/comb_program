use rusqlite::{Connection, Statement, params};
use std::collections::VecDeque;
use crate::models;

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

pub fn get_by_id(id:i64, connection_str: &str) -> rusqlite::Result<models::OutputParameter> {
    let conn = Connection::open(connection_str).unwrap();   
    let mut stmt = conn.prepare(&format!("SELECT * FROM output_parameter WHERE id = {id})"))?;
    let output_parameters = select(&mut stmt)?;
    Ok(output_parameters[0].to_owned())
}

pub fn get_all(connection_str: &str) -> rusqlite::Result<Vec<models::OutputParameter>> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT * FROM output_parameter")?;
    let output_parameters = select(&mut stmt)?.into_iter().collect();
    Ok(output_parameters)
}

pub fn create(output_parameter: &mut models::OutputParameter, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("INSERT INTO output_parameter (layer_id, name) VALUES (?, ?)")?;
    stmt.execute(rusqlite::params![
        &output_parameter.layer_id,
        &output_parameter.name,
    ])?;

    let new_id = conn.last_insert_rowid();
    output_parameter.id = new_id;    
    
    Ok(())
}

pub fn update(output_parameter: &models::OutputParameter, connection_str: &str) -> rusqlite::Result<()> {
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