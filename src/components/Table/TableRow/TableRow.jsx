import React from 'react';
import TableCell from '../TableCell/TableCell';
import classes from './TableRow.module.css'

const TableRow = ({rowValues, setValue}) => {
    return (
        <div>
            {
                rowValues.map(value => 
                    <TableCell value={value} setValue={setValue}/>
                )
            }
        </div>
    );
};

export default TableRow;