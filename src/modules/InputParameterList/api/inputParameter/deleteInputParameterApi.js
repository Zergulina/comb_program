import { invoke } from "@tauri-apps/api";
import { deleteInputParameterById } from "../../../../store/inputParameters/slice";
import { deleteInputValueByInputParameterId } from "../../../../store/inputValues/slice";

export const deleteInputParameter = (id, dispatch) => {
  invoke("delete_input_parameter", { id })
    .then(() => {
      dispatch(deleteInputParameterById(id));
      dispatch(deleteInputValueByInputParameterId(id));
    })
    .catch((errorMessage) => {
      console.error(errorMessage);
    });
};
