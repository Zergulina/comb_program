use serde::Deserialize;

#[derive(Deserialize)]
pub struct UpdateOutputValueRequestDto {
    pub value: String,
}