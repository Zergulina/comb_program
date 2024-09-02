import { combineReducers } from "@reduxjs/toolkit";
import layerPathReduser from './layerPath/slice';
import layerReducer from './layers/slice';

export default combineReducers({
    layerPath: layerPathReduser,
    layers: layerReducer,
});