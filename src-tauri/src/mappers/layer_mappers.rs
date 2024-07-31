use crate::{dtos::layer_dtos::CreateLayerRequestDto, models::Layer};

pub fn to_layer_from_create_dto(layer_dto: CreateLayerRequestDto) -> Layer {
    Layer {
        id: 0,
        prev_layer_id: layer_dto.prev_layer_id,
        is_final: layer_dto.is_final,
        name: layer_dto.name,
        description: layer_dto.description,
        image: layer_dto.image,
        image_format: layer_dto.image_format
    }
}