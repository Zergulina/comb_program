use crate::{dtos::input_value_dtos::CreateInputValueRequestDto, models::InputValue};

pub fn to_input_value_from_create_dto(
    input_parameter_id: i64,
    input_value_dto: CreateInputValueRequestDto,
) -> InputValue {
    InputValue {
        id: 0,
        input_parameter_id: input_parameter_id,
        value: input_value_dto.value,
    }
}
