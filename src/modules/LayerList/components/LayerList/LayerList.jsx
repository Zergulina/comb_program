import LayerListUnit from "../LayerListUnit/LayerListUnit";
import { useDispatch, useSelector } from "react-redux";
import classes from "./LayerList.Module.css";
import { useEffect } from "react";
import { getPrevLayerId } from "../../../../store/selectors";
import { getLayersByPrevLayerIdApi } from "../../api/getLayersByPrevLayerIdApi";


const LayerList = ({ className }) => {
    const prevLayerId = useSelector(getPrevLayerId);
    const layers = useSelector(state => state.layers);
    const layerPath = useSelector(state => state.layerPath);
    const dispatch = useDispatch();

    useEffect(() => {
        getLayersByPrevLayerIdApi(prevLayerId, dispatch);
    }, [prevLayerId])

    return (
        <div className={`${classes.LayerList} ${className}`}>
            {
                layers.map(layer =>
                    <LayerListUnit
                        key={layer.id}
                        isFinal={layer.is_final}
                        layerName={layer.name}
                        layerDescription={layer.description}
                        uintArrayImage={new Uint8Array(layer.image)}
                        imageFormat={layer.image_format}
                        id = {layer.id}
                        className={classes.LayerListUnit}
                    />
                )
            }
        </div>
    );
};

export default LayerList;