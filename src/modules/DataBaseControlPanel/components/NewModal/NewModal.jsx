import React, { useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import Modal from '../../../../components/Modal/Modal';
import ImageContainer from '../../../../UI/ImageContainer/ImageContainer';
import classes from "./NewModal.module.css"
import Button from '../../../../UI/Button/Button';
import InputText from '../../../../UI/InputText/InputText'
import { readBinaryFile } from '@tauri-apps/api/fs';
import TextArea from '../../../../UI/TextArea/TextArea';
import { createNewLayer } from '../../api/createNewLayer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPrevLayerId } from '../../../../store/selectors';

const NewModal = ({ isShown, closeCallback }) => {
    const [layerName, setLayerName] = useState("");
    const [layerDescription, setLayerDescription] = useState("");
    const [uintArrayImage, setUintArrayImage] = useState([]);
    const [imageFormat, setImageFormat] = useState("");

    const prevLayerId = useSelector(getPrevLayerId);

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

            setUintArrayImage(contents);

            const splitedPath = imageDir.split('.');
            setImageFormat(splitedPath[splitedPath.length - 1]);
        }
        catch {
            return;
        }
    }

    return (
        <Modal isShown={isShown} closeCallback={closeCallback} className={classes.Modal}>
            <ImageContainer className={classes.ImageContainer} uintArrayImage={uintArrayImage} imageFormat={imageFormat} />
            <Button className={classes.ButtonImage} onClick={getImage}>Выберите изображение</Button>
            <InputText placeholder={"Название слоя"} value={layerName} setValue={setLayerName} className={classes.InputTextName} />
            <TextArea placeholder={"Описание"} value={layerDescription} setValue={setLayerDescription} className={classes.TextAreaDescription} />
            <div className={classes.ButtonContainer}>
                <Button className={classes.Button}
                    onClick={() => createNewLayer(prevLayerId, false, layerName, layerDescription, uintArrayImage, imageFormat, dispatch)}
                >
                    Добавить слой
                </Button>
                <Button className={classes.Button}
                    onClick={() => createNewLayer(prevLayerId, true, layerName, layerDescription, uintArrayImage, imageFormat, dispatch)}
                >
                    Добавить элемент
                </Button>
            </div>
        </Modal>
    );
};

export default NewModal;