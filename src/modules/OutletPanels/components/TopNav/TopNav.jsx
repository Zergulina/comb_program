import React from 'react';
import classes from './TopNav.module.css'

const TopNav = ({children, className}) => {
    return (
        <div className={classes.TopNav + " " + className}>
            {children}
        </div>
    );
};

export default TopNav;