import LayerListUnit from "../LayerListUnit/LayerListUnit";
import { useDispatch, useSelector } from "react-redux";
// import classes from "./LayerList.Module.css";
import { useEffect } from "react";
import { getPrevLayerId } from "../../../../store/selectors";
import { getLayersByPrevLayerIdApi } from "../../api/getLayersByPrevLayerIdApi";
import List from "../../../../components/List/List"


const LayerList = ({ className }) => {
    const prevLayerId = useSelector(getPrevLayerId);
    const layers = useSelector(state => state.layers);
    const dispatch = useDispatch();

    useEffect(() => {
        getLayersByPrevLayerIdApi(prevLayerId, dispatch);
    }, [prevLayerId])

    return (
        <List className={className}>
            {
                layers.map(layer =>
                    <LayerListUnit
                        key={layer.id}
                        isFinal={layer.is_final}
                        layerName={layer.name}
                        layerDescription={layer.description}
                        uintArrayImage={new Uint8Array(layer.image)}
                        imageFormat={layer.image_format}
                        id={layer.id}
                        // className={classes.LayerListUnit}
                    />
                )
            }
        </List>
    );
};

export default LayerList;