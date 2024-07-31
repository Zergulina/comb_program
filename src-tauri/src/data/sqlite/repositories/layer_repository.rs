use rusqlite::{Connection, Statement, params};
use std::collections::VecDeque;
use crate::models;

fn select(stmt: &mut Statement) -> rusqlite::Result<VecDeque<models::Layer>> {
    let layers_result = stmt.query_map(rusqlite::params![], |row| {
        Ok(models::Layer {
            id: row.get(0)?,
            prev_layer_id: row.get(1)?,
            is_final: (|x: i64| -> bool {
                if x == 1 {
                    return true;
                } else {
                    return false;
                }
            })(row.get(2)?),
            name: row.get(3)?,
            description: row.get(4)?,
            image: row.get(5)?,
            image_format: row.get(6)?,
        })
    })?;
    let layers_result: Vec<_> = layers_result.collect();
    let mut layers = VecDeque::<models::Layer>::new();
    for layer_result in layers_result {
        match layer_result {
            Ok(layer) => layers.push_back(layer),
            Err(error) => {
                return Err(error);
            }
        }
    }
    Ok(layers)
}

pub fn get_by_id(id: i64, connection_str: &str) -> rusqlite::Result<models::Layer> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt =conn
        .prepare(&format!("SELECT * FROM layer WHERE id = {id}"))?;
    let layers = select(&mut stmt)?;
    Ok(layers[0].to_owned())
}

pub fn get_all(connection_str: &str) -> rusqlite::Result<Vec<models::Layer>> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT * FROM layer")?;
    let layers = select(&mut stmt)?.into_iter().collect();
    Ok(layers)
}

pub fn create(layer: &mut models::Layer, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("INSERT INTO layer (prev_layer_id, is_final, name, description, image, image_format) VALUES (?, ?, ?, ?, ?, ?)")?;
    stmt.execute(rusqlite::params![
        &layer.prev_layer_id,
        &(|x: bool| -> i8 {
            if x {
                return 1;
            } else {
                return 0;
            }
        })(layer.is_final),
        &layer.name,
        &layer.description,
        &layer.image,
        &layer.image_format
    ])?;

    let new_id = conn.last_insert_rowid();
    layer.id = new_id;    
    
    Ok(())
}

pub fn update(layer: &models::Layer, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("UPDATE layer SET prev_layer_id = ?, is_final = ?, name = ?, description = ?, image =? , image_format = ? WHERE id = ?")?;
    stmt.execute(rusqlite::params![
        &layer.prev_layer_id,
        &(|x: bool| -> i8 {
            if x {
                return 1;
            } else {
                return 0;
            }
        })(layer.is_final),
        &layer.name,
        &layer.description,
        &layer.image,
        &layer.image_format,
        &layer.id
    ])?;

    Ok(())
}

pub fn remove_by_id(id: i64, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    conn.execute("DELETE FROM layer WHERE id = ?", &[&id])?;
    Ok(())
}

pub fn exists(id: i64, connection_str: &str) -> rusqlite::Result<bool> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT EXISTS(SELECT 1 FROM layer WHERE id = ?1)")?;
    let exists: bool = stmt.query_row(params![id], |row| row.get(0))?;
    Ok(exists)
}

pub fn is_final(id: i64, connection_str: &str) -> rusqlite::Result<bool> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("SELECT EXISTS(SELECT is_final FROM layer WHERE id = ?1)")?;
    let exists: bool = stmt.query_row(params![id], |row| row.get(0))?;
    Ok(exists)
}