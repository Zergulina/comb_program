import React from 'react';
import classes from "./LayerCard.module.css"
import ImageContainer from '../../UI/ImageContainer/ImageContainer';

const LayerCard = ({imageBase64, className}) => {
    return (
        <div className={`${classes.LayerCard} ${className}`}>
            <ImageContainer imageBase64={imageBase64} className={classes.ImageContainer}/>
        </div>
    );
};

export default LayerCard;