import React from 'react';
import classes from './LayerSelection.module.css'
import pageClasses from '../Page.module.css'
import { DataBaseControlPanel } from "../../modules/DataBaseControlPanel/index.js"
import LayerList from '../../modules/LayerList/components/LayerList/LayerList.jsx';

const FileSelection = () => {
    return (
        <div className={pageClasses.Page}>
            <DataBaseControlPanel className={classes.DataBaseControlPanel}/>
            <LayerList className={classes.LayerList} />
        </div>
    );
};

export default FileSelection;