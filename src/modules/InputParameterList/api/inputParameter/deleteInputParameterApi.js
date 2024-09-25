import { invoke } from "@tauri-apps/api";
import { deleteInputParameterById } from "../../../../store/inputParameters/slice";

export const deleteInputParameter = (id, dispatch) => {
  invoke("delete_input_parameter", { id })
    .then(() => dispatch(deleteInputParameterById(id)))
    .catch((errorMessage) => {
      console.error(errorMessage);
    });
};
