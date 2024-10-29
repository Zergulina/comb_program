import { useEffect } from "react";
import List from "../../../components/List/List";
import OutputParameterCard from "../OutputParameterCard/OutputParameterCard";
import { useDispatch, useSelector } from "react-redux";
import { getPrevLayerId } from "../../../store/selectors";
import { getOutputParametersByLayerId } from "../api/getOutputParametersByLayerIdApi";
import { updateOutputParameter } from "../api/updateOutputParameterApi";

const OutputParameterList = ({className}) => {
    const dispatch = useDispatch();

    const layerId = useSelector(getPrevLayerId)

    useEffect(() => {
        getOutputParametersByLayerId(layerId, dispatch);
        return
    }, [])

    return (
        <List className={className}>
            {
                useSelector(store => store.outputParameters).map(parameter => 
                    <OutputParameterCard name={parameter.name} id={parameter.id} setName={(newValue) => updateOutputParameter(parameter.id, newValue, layerId, dispatch)} key={parameter.id}/>
                )
            }
        </List>
    );
};

export {OutputParameterList};