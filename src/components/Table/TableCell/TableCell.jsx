import React from 'react';
import classes from './TableCell.module.css'

const TableCell = ({value, setValue, isEditable}) => {
    return (
        <input type='text' value={value} disabled={isEditable} onChange={(e) => setValue(e.target.value)} className={classes.TableCell}/>
    );
};

export default TableCell;