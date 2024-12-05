import { invoke } from "@tauri-apps/api";
import {addOutputParameter, setOutputParameters} from "../../../store/outputParameters/slice"
import { setOutputValues } from "../../../store/outputValues/slice";
import { setInputParameters } from "../../../store/inputParameters/slice";
import { setInputValues } from "../../../store/inputValues/slice";

export const createOutputParameterApi = (name, layerId, dispatch) => {
    const outputParameterDto = {
        name: name
    }

    invoke("create_output_parameter", {layerId, outputParameterDto}).then(() => {
        invoke("get_layer_by_id", { id: layerId })
        .then((result) => {
          dispatch(setOutputParameters(result.output_parameters)); //TODO: создание выходных значений на клиенте
          dispatch(setOutputValues(result.output_values));
          dispatch(setInputParameters(result.input_parameters));
          dispatch(setInputValues(result.input_values));
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
        });
    }).catch(errorMessage => {
        console.error(errorMessage);
    });
}