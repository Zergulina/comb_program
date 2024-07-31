use serde::Deserialize;

#[derive(Deserialize)]
pub struct CreateOutputParameterRequestDto {
    pub name: String,
}

#[derive(Deserialize)]
pub struct UpdateOutputParameterRequestDto {
    pub layer_id: i64,
    pub name: String,
}