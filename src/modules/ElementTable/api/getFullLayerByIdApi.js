import { invoke } from "@tauri-apps/api";
import { setOutputParameters } from "../../../store/outputParameters/slice";
import { setOutputValues } from "../../../store/outputValues/slice";
import { setInputParameters } from "../../../store/inputParameters/slice";
import { setInputValues } from "../../../store/inputValues/slice";

export const getFullLayerById = (id, dispatch) => {
  invoke("get_layer_by_id", { id })
    .then((result) => {
      dispatch(setOutputParameters(result.output_parameters));
      dispatch(setOutputValues(result.output_values));
      dispatch(setInputParameters(result.input_parameters));
      dispatch(setInputValues(result.input_values));
    })
    .catch((errorMessage) => console.error(errorMessage));
};
