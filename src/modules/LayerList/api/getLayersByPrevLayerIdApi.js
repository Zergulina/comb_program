import { invoke } from "@tauri-apps/api";
import { setLayers } from "../../../store/layers/slice";

export const getLayersByPrevLayerIdApi = (prevId, dispatch) => {
    invoke('get_layers_by_prev_id', {prevId}).then(layers => {
        dispatch(setLayers(layers));
    }).catch(errorMessage => {
        console.error(errorMessage);
    });
}