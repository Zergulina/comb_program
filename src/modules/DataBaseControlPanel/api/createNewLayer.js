import { invoke } from "@tauri-apps/api";
import { addLayer } from "../../../store/layers/slice";

export const createNewLayer = (
  prevLayerId,
  isFinal,
  layerName,
  layerDescription,
  uintArrayImage,
  imageFormat,
  dispatch
) => {
  const layerDto = {
    prev_layer_id: prevLayerId,
    is_final: isFinal,
    name: layerName,
    description: layerDescription,
    image: Array.from(uintArrayImage),
    image_format: imageFormat,
  };

  return invoke("create_layer", {
    layerDto: layerDto,
  })
    .then((result) => {
      dispatch(addLayer(result));
    })
    .catch((errorMessage) => {
      console.error(errorMessage);
    });
};
