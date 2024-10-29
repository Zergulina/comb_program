import { invoke } from "@tauri-apps/api";
import { updateOutputParameterById } from "../../../store/outputParameters/slice";

export const updateOutputParameter = (id, name, layerId, dispatch) => {
    const outputParameterDto = {
        name: name,
        layer_id: layerId 
    };
    invoke("update_output_parameter", {id, outputParameterDto}).then(result => {
        dispatch(updateOutputParameterById(result));
    }).catch(errorMessage => {
        console.error(errorMessage);
    })
}