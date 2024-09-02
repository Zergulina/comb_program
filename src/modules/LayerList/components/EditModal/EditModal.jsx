import React, { useState } from 'react';
import Modal from '../../../../components/Modal/Modal';
import ImageContainer from '../../../../UI/ImageContainer/ImageContainer';
import Button from '../../../../UI/Button/Button';
import InputText from '../../../../UI/InputText/InputText';
import TextArea from '../../../../UI/TextArea/TextArea';
import classes from './EditModal.module.css'
import { readBinaryFile } from '@tauri-apps/api/fs';
import { open } from '@tauri-apps/api/dialog';
import { updateLayerApi } from '../../api/updateLayerApi';
import { useDispatch } from 'react-redux';

const EditModal = ({ isShown, closeCallback, layerName, layerDescription, uintArrayImage, imageFormat, id }) => {
    const [newLayerName, setNewLayerName] = useState(layerName);
    const [newLayerDescription, setNewLayerDescription] = useState(layerDescription);
    const [newUintArrayImage, setNewUintArrayImage] = useState(uintArrayImage);
    const [newImageFormat, setNewImageFormat] = useState(imageFormat);

    const dispatch = useDispatch();

    const getImage = async () => {
        try {
            const imageDir = await open({
                filters: [{
                    name: 'Image',
                    extensions: ['jpg', 'jpeg']
                }]
            })

            const contents = await readBinaryFile(imageDir);

            setNewUintArrayImage(contents);

            const splitedPath = imageDir.split('.');
            setNewImageFormat(splitedPath[splitedPath.length - 1]);
        }
        catch {
            return;
        }
    }

    return (
        <Modal isShown={isShown} closeCallback={closeCallback} className={classes.Modal}>
            <ImageContainer className={classes.ImageContainer} uintArrayImage={newUintArrayImage} imageFormat={newImageFormat} />
            <Button className={classes.ButtonImage} onClick={getImage}>Выберите изображение</Button>
            <InputText placeholder={"Название слоя"} value={newLayerName} setValue={setNewLayerName} className={classes.InputTextName} />
            <TextArea placeholder={"Описание"} value={newLayerDescription} setValue={setNewLayerDescription} className={classes.TextAreaDescription} />
            <div className={classes.ButtonContainer}>
                <Button className={classes.Button}
                    onClick={() => updateLayerApi(
                        id,
                        newLayerName,
                        newLayerDescription,
                        newUintArrayImage,
                        newImageFormat,
                        dispatch
                    )}
                >
                    Применить изменения
                </Button>
                <Button className={classes.Button}
                    onClick={() => {
                        setNewLayerName(layerName);
                        setNewLayerDescription(layerDescription);
                        setNewUintArrayImage(uintArrayImage);
                        setNewImageFormat(imageFormat);
                    }}
                >
                    Отменить изменения
                </Button>
            </div>
        </Modal>
    );
};

export default EditModal;