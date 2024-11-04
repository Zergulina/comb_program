use crate::models::{self, OutputValue};
use rusqlite::{params, Connection, Statement, ToSql};
use std::collections::VecDeque;

pub fn update(output_value: &models::OutputValue, connection_str: &str) -> rusqlite::Result<()> {
    let conn = Connection::open(connection_str).unwrap();
    let mut stmt = conn.prepare("UPDATE output_value SET value = ? WHERE id = ?")?;
    stmt.execute(rusqlite::params![&output_value.value, &output_value.id,])?;

    Ok(())
}

pub fn get_by_id(id: i64, connection_str: &str) -> rusqlite::Result<models::OutputValue> {
    let conn: Connection = Connection::open(connection_str).unwrap();
    let output_value = conn.query_row(
        "SELECT id, output_parameter_id, value, input_value_ids FROM output_value WHERE id = ?",
        params![&id],
        |row| {
            Ok(OutputValue {
                id: row.get(0)?,
                output_parameter_id: row.get(1)?,
                value: row.get(2)?,
                input_value_ids: row.get(3)?,
            })
        },
    )?;
    Ok(output_value)
}

pub fn get_by_layer_id(
    layer_id: i64,
    connection_str: &str,
) -> rusqlite::Result<Vec<models::OutputValue>> {
    let conn: Connection = Connection::open(connection_str).unwrap();
    let mut stmt =
    conn.prepare("SELECT output_value.id, output_value.output_parameter_id, output_value.value, output_value.input_value_ids FROM output_value LEFT JOIN output_parameter ON output_value.output_parameter_id = output_parameter.id WHERE output_parameter.layer_id = ?")?;
    let mut output_value_rows = stmt.query(params![&layer_id])?;

    let mut output_values: Vec<OutputValue> = Vec::<models::OutputValue>::new();
    while let Some(row) = output_value_rows.next()? {
        output_values.push(OutputValue {
            id: row.get(0)?,
            output_parameter_id: row.get(1)?,
            value: row.get(2)?,
            input_value_ids: row.get(3)?,
        });
    }
    Ok(output_values)
}
