import { invoke } from "@tauri-apps/api";
import { deleteInputValueById } from "../../../../store/inputValues/slice";

export const deleteInputValue = (id, dispatch) => {
    invoke("delete_input_value", {id})
    .then(() => {
        dispatch(deleteInputValueById(id));
    })
    .catch(errorMessage => {
        console.error(errorMessage);
    });
}