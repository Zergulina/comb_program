use serde::Serialize;

#[derive(Clone, Debug, Serialize)]
pub struct Layer {
    pub id: i64,
    pub prev_layer_id: Option<i64>,
    pub is_final: bool,
    pub name: String,
    pub description: Option<String>,
    pub image: Option<Vec<u8>>,
    pub image_format: Option<String>,
}

#[derive(Clone, Debug, Serialize)]
pub struct InputParameter {
    pub id: i64,
    pub layer_id: i64,
    pub name: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct InputValue {
    pub id: i64,
    pub input_parameter_id: i64,
    pub value: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct OutputParameter {
    pub id: i64,
    pub layer_id: i64,
    pub name: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct OutputValue {
    pub id: i64,
    pub output_parameter_id: i64,
    pub value: String,
    pub input_value_ids: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct InputOutputValue {
    pub input_value_id: i64,
    pub output_value_id: i64,
}