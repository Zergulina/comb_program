import React from 'react';
import classes from './TitleBar.module.css'

const TitleBar = ({children, className}) => {
    return (
        <div className={classes.TitleBar + " " + className}>
            {children}
        </div>
    );
};

export default TitleBar;