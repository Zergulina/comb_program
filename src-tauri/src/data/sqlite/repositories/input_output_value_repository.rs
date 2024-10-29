use rusqlite::Connection;
use crate::models;

pub fn create(input_output_value: &mut models::InputOutputValue, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("INSERT INTO input_output_value (input_value_id, output_value_id) VALUES (?, ?)")?;
    stmt.execute(rusqlite::params![
        &input_output_value.input_value_id,
        &input_output_value.output_value_id,
    ])?;

    Ok(())
}

pub fn remove_by_id(input_value_id: i64, output_value_id: i64, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    conn.execute("DELETE FROM input_output_parameter WHERE input_value_id = ? AND output_value_id = ?", &[&input_value_id, &output_value_id])?;
    Ok(())
}