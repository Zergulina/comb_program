import Modal from "../../../../components/Modal/Modal"
import Button from "../../../../UI/Button/Button";
import classes from './DeleteModal.module.css'
import { deleteLayerByIdApi } from "../../api/deleteLayerByIdApi";
import { useDispatch } from "react-redux";

const DeleteModal = ({ id, name, isFinal, isShown, closeCallback }) => {
    const dispatch = useDispatch();
    return (
        <Modal isShown={isShown} closeCallback={closeCallback} className={classes.Modal}>
            <div className={classes.TextWrapper}>
                <div className={classes.Text}>
                    Вы действительно хотите удалить {isFinal ? "элемент" : "слой"} {name}?
                </div>
            </div>
            <div className={classes.ButtonContainer}>
                <Button onClick={()=>deleteLayerByIdApi(id, dispatch)}>Да</Button>
                <Button onClick={closeCallback}>Нет</Button>
            </div>
        </Modal>
    );
};

export default DeleteModal;