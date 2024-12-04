import React, { useEffect } from 'react';
import { Table } from '../../../components/Table/Table/Table';
import { buildElementTable, getPrevLayerId } from '../../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { updateOutputValue } from '../api/updateOutputValueApi';
import { getFullLayerById } from '../api/getFullLayerByIdApi';

const ElementTable = ({ className }) => {
    const tableValues = useSelector(buildElementTable);
    const dispatch = useDispatch();
    const prevLayerId = useSelector(getPrevLayerId);

    useEffect(() => {
        getFullLayerById(prevLayerId, dispatch)

    }, [])

    return (
        <Table tableValues={tableValues} className={className} setValue={(value, id) => updateOutputValue(id, value, dispatch)} />
    );
};

export default ElementTable;