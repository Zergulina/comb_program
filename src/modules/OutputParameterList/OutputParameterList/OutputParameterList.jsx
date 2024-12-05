import { useEffect } from "react";
import List from "../../../components/List/List";
import OutputParameterCard from "../OutputParameterCard/OutputParameterCard";
import { useDispatch, useSelector } from "react-redux";
import { getPrevLayerId } from "../../../store/selectors";
import { getOutputParametersByLayerId } from "../api/getOutputParametersByLayerIdApi";
import { updateOutputParameter } from "../api/updateOutputParameterApi";
import classes from './OutputParameterList.module.css'

const OutputParameterList = ({className}) => {
    const dispatch = useDispatch();

    const layerId = useSelector(getPrevLayerId)

    // useEffect(() => {
    //     getOutputParametersByLayerId(layerId, dispatch);
    //     return
    // }, [])

    return (
        <List className={className}>
            {
                useSelector(store => store.outputParameters).map(parameter => 
                    <OutputParameterCard name={parameter.name} id={parameter.id} setName={(newValue) => updateOutputParameter(parameter.id, newValue, layerId, dispatch)} className={classes.OutputParameterCard} key={parameter.id}/>
                )
            }
        </List>
    );
};

export {OutputParameterList};