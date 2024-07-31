use crate::{dtos::output_parameter_dtos::CreateOutputParameterRequestDto, models::OutputParameter};

pub fn to_output_parameter_from_create_dto(
    layer_id: i64,
output_parameter_dto: CreateOutputParameterRequestDto,
) -> OutputParameter {
    OutputParameter {
        id: 0,
        layer_id: layer_id,
        name: output_parameter_dto.name,
    }
}
