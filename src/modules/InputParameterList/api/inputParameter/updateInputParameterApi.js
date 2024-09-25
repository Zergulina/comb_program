import { invoke } from "@tauri-apps/api";
import { updateInputParameterById } from "../../../../store/inputParameters/slice";

export const updateInputParameter = (id, name, layerId, dispatch) => {
    const inputParameterDto = {
        name: name,
        layer_id: layerId 
    };
    invoke("update_input_parameter", {id, inputParameterDto}).then(result => {
        dispatch(updateInputParameterById(result));
    }).catch(errorMessage => {
        console.error(errorMessage);
    })
}