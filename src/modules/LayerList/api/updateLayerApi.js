import { invoke } from "@tauri-apps/api";
import { updateLayer } from "../../../store/layers/slice";

export const updateLayerApi = (
  id,
  layerName,
  layerDescription,
  uintArrayImage,
  imageFormat,
  dispatch
) => {
  const layerDto = {
    name: layerName,
    description: layerDescription,
    image: Array.from(uintArrayImage),
    image_format: imageFormat,
  };

  invoke("update_layer", { id: id, layerDto: layerDto })
    .then((result) => {
      dispatch(updateLayer(result));
    })
    .catch((errorMessage) => {
      console.error(errorMessage);
    });
};
