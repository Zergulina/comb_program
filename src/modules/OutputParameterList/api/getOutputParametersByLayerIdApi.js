import { invoke } from "@tauri-apps/api";
import { setOutputParameters } from "../../../store/outputParameters/slice";

export const getOutputParametersByLayerId = (layerId, dispatch) => {
    invoke("get_output_parameters_by_layer_id", {layerId}).then(result => {
        dispatch(setOutputParameters(result));
    }).catch(errorMessage => {
        console.error(errorMessage);
    });
}