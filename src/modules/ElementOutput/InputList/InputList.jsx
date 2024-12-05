import React, { useEffect } from 'react';
import List from '../../../components/List/List';
import { useSelector } from 'react-redux';
import InputText from '../../../UI/InputText/InputText';
import DropDown from '../../../UI/DropDown/DropDown';
import { getInputValuesByInputParameterId } from '../../../store/selectors';

const InputList = ({ selectedInputValueIds, setSelectedInputValueIds }) => {
    const inputParameters = useSelector(store => store.inputParameters);

    useEffect(() => {
        const arr = new Array(inputParameters.Length);
        arr.fill("");
        setSelectedInputValueIds(arr);
    }, [inputParameters]);

    return (
        <List>
            {
                inputParameters.map(
                    (inputParameter, index) => <div key={inputParameter.id}>
                        <InputText value={inputParameter.name} />
                        <DropDown options={useSelector(getInputValuesByInputParameterId(inputParameter.id))} setSelectedOption={e => {
                            const arr = [...selectedInputValueIds];
                            arr[index] = e.target.value;
                            setSelectedInputValueIds(arr);
                        }
                        }
                            value={selectedInputValueIds[index]}
                            placeholder={"Выберите значение"}
                        />
                    </div>
                )
            }
        </List>
    );
};

export default InputList;