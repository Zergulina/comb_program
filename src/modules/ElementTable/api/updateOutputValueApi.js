import { invoke } from "@tauri-apps/api";
import { updateOutputValueById } from "../../../store/outputValues/slice";

export const updateOutputValue = (id, value, dispatch) => {
    const outputValueDto = {
        value: value,
    };
    invoke("update_output_value", {id, outputValueDto}).then(result => {
        dispatch(updateOutputValueById(result));
    }).catch(errorMessage => {
        console.error(errorMessage);
    })
}