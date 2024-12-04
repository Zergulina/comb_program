import { invoke } from "@tauri-apps/api";
import { addInputValue, setInputValues } from "../../../../store/inputValues/slice";
import { setOutputParameters } from "../../../../store/outputParameters/slice";
import { setOutputValues } from "../../../../store/outputValues/slice";
import { setInputParameters } from "../../../../store/inputParameters/slice";

export const createInputValue = (inputParameterId, value, layerId, dispatch) => {
    const inputValueDto = {
        value: value,
    };

    invoke("create_input_value", {inputParameterId, inputValueDto})
    .then(() => {
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
    })
    .catch (errorMessage => {
        console.error(errorMessage);
    });
}