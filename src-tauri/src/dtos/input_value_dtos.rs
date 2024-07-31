use serde::Deserialize;

#[derive(Deserialize)]
pub struct CreateInputValueRequestDto {
    pub value: String,
}

#[derive(Deserialize)]
pub struct UpdateInputValueRequestDto {
    pub input_parameter_id: i64,
    pub value: String,
}