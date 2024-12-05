import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputText from '../../../UI/InputText/InputText';
import List from '../../../components/List/List';
import TextArea from '../../../UI/TextArea/TextArea';
import classes from './OutputList.module.css'

const OutputList = ({ inputValueIdsArray, className }) => {
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
        <List className={className}>
            {
                outputParameters.map(outputParameter => <div className={classes.OutputListUnit}>
                    <h3>{outputParameter.name}</h3>
                    <InputText value={inputValueIds != "" ?
                        outputValues.find(outputValue => outputValue.output_parameter_id == outputParameter.id && outputValue.input_value_ids == inputValueIds).value : ""}
                        isDisabled={true} className ={classes.InputText}
                    />
                </div>)
            }
        </List>

    );
};

export default OutputList;