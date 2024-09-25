import { invoke } from "@tauri-apps/api";
import { updateInputValueById } from "../../../../store/inputValues/slice";

export const updateInputValue = (id, value, inputParameterId, dispatch) => {
    const inputValueDto = {
        input_parameter_id: inputParameterId,
        value: value,
    };

    invoke("update_input_value", {id, inputValueDto})
    .then(result => {
        dispatch(updateInputValueById(result));
    })
    .catch(errorMessage => {
        console.error(errorMessage);
    })
}