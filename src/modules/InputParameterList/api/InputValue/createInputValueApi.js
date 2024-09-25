import { invoke } from "@tauri-apps/api";
import { addInputValue } from "../../../../store/inputValues/slice";

export const createInputValue = (inputParameterId, value, dispatch) => {
    const inputValueDto = {
        value: value,
    };

    invoke("create_input_value", {inputParameterId, inputValueDto})
    .then(result => {
        dispatch(addInputValue(result));
    })
    .catch (errorMessage => {
        console.error(errorMessage);
    });
}