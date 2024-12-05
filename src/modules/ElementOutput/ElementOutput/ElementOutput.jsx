import React, { useEffect, useState } from 'react';
import { getFullLayerById } from '../api/getFullLayerByIdApi';
import { useDispatch, useSelector } from 'react-redux';
import { getPrevLayerId } from '../../../store/selectors';
import InputList from '../InputList/InputList';
import OutputList from '../OutputList/OutputList';

const ElementOutput = () => {
    const dispatch = useDispatch();
    const layerId = useSelector(getPrevLayerId)

    const [selectedInputValueIds, setSelectedInputValueIds] = useState([]);

    // useEffect(() => {
    //     getFullLayerById(layerId, dispatch);
    // }, []);

    return (
        <div>
            <InputList selectedInputValueIds={selectedInputValueIds} setSelectedInputValueIds={setSelectedInputValueIds} />
            <OutputList inputValueIdsArray = {selectedInputValueIds}/>
        </div>
    );
};

export default ElementOutput;