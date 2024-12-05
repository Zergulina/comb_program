import React from 'react';
import classes from './TableCell.module.css'

const TableCell = ({ value, setValue }) => {
    return (
        <input type='text' value={value ? value.tableValue ? value.tableValue.name ? value.tableValue.name: value.tableValue.value : "" : ""} disabled={value ? !value.editable : false} onChange={(e) => setValue(e.target.value, value.tableValue.id)} className={classes.TableCell} />
    );
};

export default TableCell;