import React from 'react';
import pageClasses from '../Page.module.css';
import {DataBaseControlPanel} from "../../modules/DataBaseControlPanel/index.js"

const FileSelection = () => {
    return (
        <div className={pageClasses.Page}>
            <DataBaseControlPanel/>
        </div>
    );
};

export default FileSelection;