import React from 'react';
import classes from './DataBaseControlPanel.module.css'
import Button from '../../../../UI/Button/Button';
import NewModal from '../NewModal/NewModal';
import useModal from '../../../../components/Modal/hooks';

const DataBaseControlPanel = ({className}) => {
    const [isShowingModal, toggleModal] = useModal();

    return (
        <div className={`${classes.DataBaseControlPanel} ${className}`}>
            <Button className={classes.Button} onClick={toggleModal}>Добавить</Button>
            <Button className={classes.Button}>Импорт</Button>
            <Button className={classes.Button}>Экспорт</Button>
            <NewModal isShown={isShowingModal} closeCallback={toggleModal}/>
        </div>
    );
};

export {DataBaseControlPanel};