use rusqlite::{Connection, Statement, params};
use std::collections::VecDeque;
use crate::models;

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

pub fn create(input_parameter: &mut models::InputParameter, connection_str: &str) -> rusqlite::Result<()> {
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

pub fn update(input_parameter: &models::InputParameter, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("UPDATE input_parameter SET name = ? WHERE id = ?")?;
    stmt.execute(rusqlite::params![
        &input_parameter.name,
        &input_parameter.id
    ])?;

    Ok(())
}

pub fn remove_by_id(id: i64, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    conn.execute("DELETE FROM input_parameter WHERE id = ?", &[&id])?;
    Ok(())
}

pub fn exists(id: i64, connection_str: &str) -> rusqlite::Result<bool> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT EXISTS(SELECT 1 FROM input_parameter WHERE id = ?1)")?;
    let exists: bool = stmt.query_row(params![id], |row| row.get(0))?;
    Ok(exists)
}