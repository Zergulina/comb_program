import React from 'react';
import classes from './LeftPanel.module.css'

const LeftPanel = ({children, className}) => {
    return (
        <div className={classes.LeftPanel + " " + className}>
            {children}
        </div>
    );
};

export default LeftPanel;