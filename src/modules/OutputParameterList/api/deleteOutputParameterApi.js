import { invoke } from "@tauri-apps/api";
import { deleteOutputParameterById } from "../../../store/outputParameters/slice";

export const deleteOutputParameter = (id, dispatch) => {
  invoke("delete_output_parameter", { id })
    .then(() => dispatch(deleteOutputParameterById(id)))
    .catch((errorMessage) => {
      console.error(errorMessage);
    });
};
