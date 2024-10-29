import { useEffect } from "react";
import List from "../../../components/List/List";
import InputParameterCard from "../InputParameterCard/InputParameterCard";
import { useDispatch, useSelector } from "react-redux";
import { getPrevLayerId } from "../../../store/selectors";
import { getInputParametersByLayerId } from "../api/inputParameter/getInputParametersByLayerIdApi";
import { updateInputParameter } from "../api/inputParameter/updateInputParameterApi";
import { getInputValuesByInputParameterIds } from "../api/InputValue/getInputValuesByInputParameterIdsApi";

const InputParameterList = ({className}) => {
    const dispatch = useDispatch();

    const layerId = useSelector(getPrevLayerId)

    useEffect(() => {
        getInputParametersByLayerId(layerId, dispatch);
        return
    }, [])

    return (
        <List className={className}>
            {
                useSelector(store => store.inputParameters).map(parameter => 
                    <InputParameterCard name={parameter.name} id={parameter.id} setName={(newValue) => updateInputParameter(parameter.id, newValue, layerId, dispatch)} key={parameter.id}/>
                )
            }
        </List>
    );
};

export {InputParameterList};