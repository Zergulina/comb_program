import Card from "../../../components/Card/Card";
import InputText from "../../../UI/InputText/InputText";
import { deleteInputParameter } from "../api/inputParameter/deleteInputParameterApi";
import { useDispatch, useSelector } from "react-redux";
import classes from './InputParameterCard.module.css'
import Button from '../../../UI/Button/Button'
import InputValueList from "../InputValueList/InputValueList";
import { createInputValue } from "../api/InputValue/createInputValueApi";
import { getPrevLayerId } from "../../../store/selectors";

const InputParameterCard = ({name, setName, id}) => {
    const dispatch = useDispatch();

    const layerId = useSelector(getPrevLayerId)
    
    return (
        <Card crossOnClick={() => deleteInputParameter(id, dispatch)}>
            <InputText value={name} setValue={setName} className={classes.InputParameterName} placeholder={"Название входного параметра"}/>
            <InputValueList inputParameterId = {id} className={classes.InputValueList}/>
            <Button className={classes.AddInputValueButton} onClick={() => createInputValue(id, "", layerId, dispatch) }> Добавить значение</Button>
        </Card>
    );
};

export default InputParameterCard;