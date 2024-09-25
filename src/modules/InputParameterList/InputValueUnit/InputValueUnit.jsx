import { BsX } from "react-icons/bs";
import InputText from "../../../UI/InputText/InputText";
import classes from "./InputValueUnit.module.css"
import { useDispatch } from "react-redux";
import { deleteInputValue } from "../api/InputValue/deleteInputValueApi";

const InputValueUnit = ({name, setName, id}) => {
    const dispatch = useDispatch();

    return (
        <div className={classes.InputValueUnit}>
            <InputText value={name} setValue={setName} placeholder={"Входное значение"} className={classes.InputValueName}/>
            <BsX className={classes.Cross} onClick={() => dispatch(deleteInputValue(id, dispatch))}/> 
        </div>
    );
};

export default InputValueUnit;