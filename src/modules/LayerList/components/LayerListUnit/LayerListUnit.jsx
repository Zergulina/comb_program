import { BsX, BsPencilSquare } from 'react-icons/bs';
import ImageContainer from '../../../../UI/ImageContainer/ImageContainer';
import TextArea from '../../../../UI/TextArea/TextArea';
import IsFinalStatus from '../IsFinalStatus/IsFinalStatus';
import classes from './LayerListUnit.module.css'
import DeleteModal from '../DeleteModal/DeleteModal';
import useModal from '../../../../components/Modal/hooks';
import EditModal from '../EditModal/EditModal';
import { useDispatch } from 'react-redux';
import { pushLayer } from '../../../../store/layerPath/slice';
import { useNavigate } from 'react-router';

const LayerListUnit = ({ isFinal, layerName, layerDescription, uintArrayImage, imageFormat, id, className }) => {
    const [isShowingDeleteModal, toggleDeleteModal] = useModal();
    const [isShowingEditModal, toggleEditModal] = useModal();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    return (
        <div className={`${classes.LayerListUnit} ${className}`}>
            <ImageContainer
                uintArrayImage={uintArrayImage}
                imageFormat={imageFormat}
                className={classes.ImageContainer}
                onClick={() => {
                    dispatch(pushLayer({ id: id, name: layerName }))
                    if (isFinal) navigate("/element")
                }}
            />
            <IsFinalStatus isFinal={isFinal} className={classes.IsFinalStatus} />
            <h2 className={classes.LayerTitle}>{layerName}</h2>
            <TextArea isDisabled={true} value={layerDescription} className={classes.TextArea} />
            <div className={classes.EditWrapper} onClick={toggleEditModal}>
                <BsPencilSquare className={classes.Edit} />
            </div>
            <BsX className={classes.Cross} onClick={toggleDeleteModal} />
            <DeleteModal isShown={isShowingDeleteModal} closeCallback={toggleDeleteModal} name={layerName} isFinal={isFinal} id={id} />
            <EditModal
                isShown={isShowingEditModal}
                closeCallback={toggleEditModal}
                layerName={layerName}
                layerDescription={layerDescription}
                uintArrayImage={uintArrayImage}
                imageFormat={imageFormat}
                id={id}
            />
        </div>
    );
};

export default LayerListUnit;