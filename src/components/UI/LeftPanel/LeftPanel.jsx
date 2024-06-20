import React from 'react';
import classes from './LeftPanel.module.css'

const LeftPanel = ({children}) => {
    return (
        <div className={classes.LeftPanel}>
            {children}
        </div>
    );
};

export default LeftPanel;