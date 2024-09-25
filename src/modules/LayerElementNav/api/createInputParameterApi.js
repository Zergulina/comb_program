import { invoke } from "@tauri-apps/api";
import {addInputParameter} from "../../../store/inputParameters/slice"

export const createInputParameterApi = (name, layerId, dispatch) => {
    const inputParameterDto = {
        name: name
    }

    invoke("create_input_parameter", {layerId, inputParameterDto}).then(result => {
        dispatch(addInputParameter(result));
    }).catch(errorMessage => {
        console.error(errorMessage);
    });
}