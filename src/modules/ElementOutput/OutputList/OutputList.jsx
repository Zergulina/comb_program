import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputText from '../../../UI/InputText/InputText';

const OutputList = ({ inputValueIdsArray }) => {
    const [inputValueIds, setInputValueIds] = useState("");

    const outputParameters = useSelector(store => store.outputParameters);
    const outputValues = useSelector(store => store.outputValues);

    useEffect(() => {
        let inputValueIdsHash = ""
        if (!inputValueIdsArray.includes('')) {
            inputValueIdsHash = inputValueIdsArray
                .sort((a, b) => Number(a) - Number(b))
                .reduce((accumulator, inputValueId) => {
                    return accumulator + ("|" + inputValueId + "|");
                }, "");
        }
        setInputValueIds(inputValueIdsHash);
    }, [inputValueIdsArray])

    return (
        <div>
            {
                outputParameters.map(outputParameter => <div>
                    <InputText value={outputParameter.name} />
                    <InputText value={inputValueIds != "" ?
                       outputValues.find(outputValue => outputValue.output_parameter_id == outputParameter.id && outputValue.input_value_ids == inputValueIds).value: ""} />
                </div>)
            }
        </div>
    );
};

export default OutputList;