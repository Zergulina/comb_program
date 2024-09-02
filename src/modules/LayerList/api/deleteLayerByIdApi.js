import { invoke } from "@tauri-apps/api";
import { deleteLayerById } from "../../../store/layers/slice";

export const deleteLayerByIdApi = (id, dispatch) => {
  invoke("delete_layer", {id})
    .then(dispatch(deleteLayerById(id)))
    .catch((errorMessage) => {
      console.error(errorMessage);
    });
};
