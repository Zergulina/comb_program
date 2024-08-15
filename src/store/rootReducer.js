import { combineReducers } from "@reduxjs/toolkit";
import layerPathReduser from './layerPath/reducer'

export default combineReducers({
    layerPath: layerPathReduser,
});