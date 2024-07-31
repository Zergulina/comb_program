use rusqlite::Connection;

pub fn init(connection_str: &str) {
    let conn = Connection::open(connection_str).unwrap();

    conn.execute(
        "CREATE TABLE IF NOT EXISTS layer (
            id INTEGER PRIMARY KEY,
            prev_layer_id INTEGER REFERENCES layer(id),
            is_final INTEGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            image BLOB,
        )",
        rusqlite::params![],
    )
    .unwrap();

    conn.execute(
        "CREATE TABLE IF NOT EXISTS input_parameter (
            id INTEGER PRIMARY KEY,
            layer_id INTEGER NOT NULL REFERENCES layer(id) ON DELETE CASCADE,
            name TEXT
        )",
        rusqlite::params![],
    )
    .unwrap();

    conn.execute(
        "CREATE TABLE IF NOT EXISTS input_value (
            id INTEGER PRIMARY KEY,
            input_parameter_id INTEGER NOT NULL REFERENCES input_parameter(id) ON DELETE CASCADE,
            value TEXT
        )",
        rusqlite::params![],
    )
    .unwrap();

    conn.execute(
        "CREATE TABLE IF NOT EXISTS output_parameter (
            id INTEGER PRIMARY KEY,
            layer_id INTEGER NOT NULL REFERENCES layer(id) ON DELETE CASCADE,
            name TEXT
        )",
        rusqlite::params![],
    )
    .unwrap();

    conn.execute(
        "CREATE TABLE IF NOT EXISTS output_value (
            input_parameter_id INTEGER NOT NULL PRIMARY KEY REFERENCES input_parameter(id) ON DELETE CASCADE,
            output_parameter_id INTEGER NOT NULL PRIMARY KEY REFERENCES output_parameter(id) ON DELETE CASCADE,
            value TEXT
        )",
        rusqlite::params![],
    )
    .unwrap();
}
