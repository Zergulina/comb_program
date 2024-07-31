use crate::{dtos::input_parameter_dtos::CreateInputParameterRequestDto, models::InputParameter};

pub fn to_input_parameter_from_create_dto(
    layer_id: i64,
    input_parameter_dto: CreateInputParameterRequestDto,
) -> InputParameter {
    InputParameter {
        id: 0,
        layer_id: layer_id,
        name: input_parameter_dto.name,
    }
}
