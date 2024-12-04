import React from 'react';
import TableRow from '../TableRow/TableRow';
import classes from './Table.module.css'

export const Table = ({tableValues, setValue, className}) => {
    return (
        <div className={`${className} ${classes.Table}`}>
            {
                tableValues.map(rowValues => 
                    <TableRow rowValues={rowValues} setValue={setValue}/>
                )
            }
        </div>
    );
};