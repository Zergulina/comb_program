use serde::Deserialize;

#[derive(Deserialize)]
pub struct CreateLayerRequestDto {
    pub prev_layer_id: Option<i64>,
    pub is_final: bool,
    pub name: String,
    pub description: Option<String>,
    pub image: Option<Vec<u8>>,
    pub image_format: Option<String>,
}

#[derive(Deserialize)]
pub struct UpdateLayerInfoRequestDto {
    pub prev_layer_id: Option<i64>,
    pub is_final: bool,
    pub name: String,
    pub description: Option<String>,
}

#[derive(Deserialize)]
pub struct UpdateLayerImageRequestDto {
    pub image: Option<Vec<u8>>,
    pub image_format: Option<String>,
}

