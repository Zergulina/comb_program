import { combineReducers } from "@reduxjs/toolkit";
import layerPathReduser from './layerPath/slice';
import layerReducer from './layers/slice';
import inputParametersReducer from './inputParameters/slice'
import inputValuesReducer from './inputValues/slice';


export default combineReducers({
    layerPath: layerPathReduser,
    layers: layerReducer,
    inputParameters: inputParametersReducer,
    inputValues: inputValuesReducer,
});