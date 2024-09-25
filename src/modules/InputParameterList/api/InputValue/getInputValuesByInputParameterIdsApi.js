import { invoke } from "@tauri-apps/api";
import { addInputValues, setInputValues } from "../../../../store/inputValues/slice";

export const getInputValuesByInputParameterIds = (inputParameterIds, dispatch) => {
    dispatch(setInputValues([]));
    inputParameterIds.forEach(inputParameterId => {
        inputParameterId = parseInt(inputParameterId);
        invoke('get_input_values_by_input_parameter_id', {inputParameterId})
        .then(result => { 
            dispatch(addInputValues(result));
        })
        .catch(errorMessage => {
            console.error(errorMessage);
        })
    }
)};