use serde::Deserialize;

#[derive(Deserialize)]
pub struct CreateOutputValueRequestDto {
    pub value: String,
}

#[derive(Deserialize)]
pub struct UpdateOutputValueRequestDto {
    pub value: String,
}