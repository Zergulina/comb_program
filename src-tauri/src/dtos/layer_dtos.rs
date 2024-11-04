use serde::{Deserialize, Serialize};

use crate::models::{InputParameter, InputValue, OutputParameter, OutputValue};

#[derive(Deserialize, Serialize)]
pub struct CreateLayerRequestDto {
    pub prev_layer_id: Option<i64>,
    pub is_final: bool,
    pub name: String,
    pub description: Option<String>,
    pub image: Option<Vec<u8>>,
    pub image_format: Option<String>,
}

#[derive(Deserialize, Serialize)]
pub struct UpdateLayerRequestDto {
    pub name: String,
    pub description: Option<String>,
    pub image: Option<Vec<u8>>,
    pub image_format: Option<String>,
}

#[derive(Serialize)]
pub struct FullLayerDto {
    pub id: i64,
    pub output_parameters: Vec<OutputParameter>,
    pub output_values: Vec<OutputValue>,
    pub input_parameters: Vec<InputParameter>,
    pub input_values: Vec<InputValue>
}

