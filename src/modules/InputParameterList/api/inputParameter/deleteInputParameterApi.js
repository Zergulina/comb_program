import { invoke } from "@tauri-apps/api";
import { setInputParameters } from "../../../../store/inputParameters/slice";
import { setInputValues } from "../../../../store/inputValues/slice";
import { setOutputParameters } from "../../../../store/outputParameters/slice";
import { setOutputValues } from "../../../../store/outputValues/slice";

export const deleteInputParameter = (id, layerId, dispatch) => {
  invoke("delete_input_parameter", { id })
    .then(() => {
      invoke("get_layer_by_id", { id: layerId })
        .then((result) => {
          dispatch(setOutputParameters(result.output_parameters)); //TODO: удаление выходных значений на клиенте
          dispatch(setOutputValues(result.output_values));
          dispatch(setInputParameters(result.input_parameters));
          dispatch(setInputValues(result.input_values));
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
        });
    })
    .catch((errorMessage) => {
      console.error(errorMessage);
    });
};
