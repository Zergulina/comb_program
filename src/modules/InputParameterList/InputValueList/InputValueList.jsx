import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getInputValuesByInputParameterId } from '../../../store/selectors';
import InputValueUnit from '../InputValueUnit/InputValueUnit';
import List from '../../../components/List/List';
import classes from './InputValueList.module.css'
import { updateInputValue } from '../api/InputValue/updateInputValueApi';

const InputValueList = ({ inputParameterId, className }) => {
    const inputValues = useSelector(state => getInputValuesByInputParameterId(state, inputParameterId));

    const dispatch = useDispatch();

    return (
        <List className={`${classes.InputValueList} ${className}`}>
            {
                inputValues.map(value => 
                    <InputValueUnit name={value.value} setName = {(newValue) => updateInputValue(value.id, newValue, inputParameterId, dispatch)} id={value.id} key={value.id}/>
                )
            }
        </List>
    );
};

export default InputValueList;