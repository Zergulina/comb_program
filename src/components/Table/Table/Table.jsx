import React from 'react';
import TableRow from '../TableRow/TableRow';

export const Table = ({tableValues, setValue, className}) => {
    return (
        <div className={className}>
            {
                tableValues.map(rowValues => 
                    <TableRow rowValues={rowValues} setValue={setValue}/>
                )
            }
        </div>
    );
};