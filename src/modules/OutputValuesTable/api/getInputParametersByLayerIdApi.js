import { invoke } from "@tauri-apps/api";
import { setInputParameters } from "../../../store/inputParameters/slice";
import { getInputValuesByInputParameterIds } from "../InputValue/getInputValuesByInputParameterIdsApi";

export const getInputParametersByLayerId = (layerId, dispatch) => {
    invoke("get_input_parameters_by_layer_id", {layerId}).then(result => {
        dispatch(setInputParameters(result));
        getInputValuesByInputParameterIds(result.map(inputParameter => inputParameter.id), dispatch)
    }).catch(errorMessage => {
        console.error(errorMessage);
    });
}