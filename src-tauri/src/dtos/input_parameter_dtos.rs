use serde::Deserialize;

#[derive(Deserialize)]
pub struct CreateInputParameterRequestDto {
    pub name: String,
}

#[derive(Deserialize)]
pub struct UpdateInputParameterRequestDto {
    pub layer_id: i64,
    pub name: String,
}