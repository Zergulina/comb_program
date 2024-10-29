import { invoke } from "@tauri-apps/api";
import {addOutputParameter} from "../../../store/outputParameters/slice"

export const createOutputParameterApi = (name, layerId, dispatch) => {
    const outputParameterDto = {
        name: name
    }

    invoke("create_output_parameter", {layerId, outputParameterDto}).then(result => {
        dispatch(addOutputParameter(result));
    }).catch(errorMessage => {
        console.error(errorMessage);
    });
}