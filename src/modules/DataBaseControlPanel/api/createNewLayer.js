import { invoke } from "@tauri-apps/api";

export const createNewLayer = (prevLayerId, isFinal, layerName, layerDescription, uintArrayImage, imageFormat) => {
    const layerDto = {
        prev_layer_id: prevLayerId, 
        is_final: isFinal,
        name: layerName,
        description: layerDescription,
        image: uintArrayImage,
        image_format: imageFormat
    }

    invoke("create_layer", {
        layerDto: layerDto,
    })
        .then(result => {
            return result.Id            
        })
        .catch(errorMessage => {
            console.error(errorMessage);
        });
} 