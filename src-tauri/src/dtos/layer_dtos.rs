use serde::{Deserialize, Serialize};

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

