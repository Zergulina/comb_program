import { invoke } from "@tauri-apps/api";
import { deleteInputValueById, setInputValues } from "../../../../store/inputValues/slice";
import { setOutputParameters } from "../../../../store/outputParameters/slice";
import { setOutputValues } from "../../../../store/outputValues/slice";
import { setInputParameters } from "../../../../store/inputParameters/slice";

export const deleteInputValue = (id, layerId, dispatch) => {
  invoke("delete_input_value", { id })
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
