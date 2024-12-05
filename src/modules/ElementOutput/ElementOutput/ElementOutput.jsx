import React, { useEffect, useState } from 'react';
import { getFullLayerById } from '../api/getFullLayerByIdApi';
import { useDispatch, useSelector } from 'react-redux';
import { getPrevLayerId } from '../../../store/selectors';
import InputList from '../InputList/InputList';
import OutputList from '../OutputList/OutputList';
import classes from './ElementOutput.module.css'

const ElementOutput = ({className}) => {
    const dispatch = useDispatch();
    const layerId = useSelector(getPrevLayerId)

    const [selectedInputValueIds, setSelectedInputValueIds] = useState([]);

    useEffect(() => {
        getFullLayerById(layerId, dispatch);
    }, []);

    return (
        <div className={className}>
            <div className={classes.ListWrapper}>
                <h1>Входные значения</h1>
                <InputList selectedInputValueIds={selectedInputValueIds} setSelectedInputValueIds={setSelectedInputValueIds} className={classes.List}/>
            </div>
            <div className={classes.ListWrapper}>
                <h1>Выходные значения</h1>
                <OutputList inputValueIdsArray={selectedInputValueIds} className={classes.List}/>
            </div >
        </div>
    );
};

export default ElementOutput;