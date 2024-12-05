import React, { useEffect } from 'react';
import List from '../../../components/List/List';
import { useSelector } from 'react-redux';
import InputText from '../../../UI/InputText/InputText';
import DropDown from '../../../UI/DropDown/DropDown';
import { getInputValuesByInputParameterId } from '../../../store/selectors';
import classes from "./inputList.module.css"

const InputList = ({ selectedInputValueIds, setSelectedInputValueIds, className }) => {
    const inputParameters = useSelector(store => store.inputParameters);

    useEffect(() => {
        const arr = new Array(inputParameters.length);
        arr.fill("");
        setSelectedInputValueIds(arr);
    }, [inputParameters]);

    return (
        <List className={className}>
            {
                inputParameters.map(
                    (inputParameter, index) => <div key={inputParameter.id} className={classes.InputListUnit}>
                        <h3>{inputParameter.name}</h3>
                        <DropDown options={useSelector(getInputValuesByInputParameterId(inputParameter.id))} setSelectedOption={e => {
                            const arr = [...selectedInputValueIds];
                            arr[index] = e.target.value;
                            setSelectedInputValueIds(arr);
                        }
                        }
                            value={selectedInputValueIds[index]}
                            placeholder={"Выберите значение"}
                            className={classes.DropDown}
                        />
                    </div>
                )
            }
        </List>
    );
};

export default InputList;