import Card from "../../../components/Card/Card";
import InputText from "../../../UI/InputText/InputText";
import { deleteOutputParameter } from "../api/deleteOutputParameterApi";
import { useDispatch } from "react-redux";
import classes from './OutputParameterCard.module.css'

const OutputParameterCard = ({name, setName, id, className}) => {
    const dispatch = useDispatch();
    
    return (
        <Card crossOnClick={() => deleteOutputParameter(id, dispatch)} className={className}>
            <InputText value={name} setValue={setName} className={classes.OutputParameterName} placeholder={"Название выходного параметра"}/>
        </Card>
    );
};

export default OutputParameterCard;