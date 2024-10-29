import React from 'react';
import TableRow from '../TableRow/TableRow';

const Table = ({tableValues, setValue}) => {
    return (
        <div>
            {
                tableValues.map(rowValues => 
                    <TableRow rowValues={rowValues} setValue={setValue}/>
                )
            }
        </div>
    );
};

export default Table;