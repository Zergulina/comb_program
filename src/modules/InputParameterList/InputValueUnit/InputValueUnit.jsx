import { BsX } from "react-icons/bs";
import InputText from "../../../UI/InputText/InputText";
import classes from "./InputValueUnit.module.css"
import { useDispatch, useSelector } from "react-redux";
import { deleteInputValue } from "../api/InputValue/deleteInputValueApi";
import { getPrevLayerId } from "../../../store/selectors";

const InputValueUnit = ({name, setName, id}) => {
    const dispatch = useDispatch();

    const layerId = useSelector(getPrevLayerId)

    return (
        <div className={classes.InputValueUnit}>
            <InputText value={name} setValue={setName} placeholder={"Входное значение"} className={classes.InputValueName}/>
            <BsX className={classes.Cross} onClick={() => dispatch(deleteInputValue(id, layerId, dispatch))}/> 
        </div>
    );
};

export default InputValueUnit;