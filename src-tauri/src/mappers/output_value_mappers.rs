use crate::{dtos::output_value_dtos::CreateOutputValueRequestDto, models::OutputValue};

pub fn to_output_value_from_create_dto(
    output_parameter_id: i64,
    output_value_dto: CreateOutputValueRequestDto,
) -> OutputValue {
    OutputValue {
        id: 0,
        output_parameter_id: output_parameter_id,
        value: output_value_dto.value,
    }
}
