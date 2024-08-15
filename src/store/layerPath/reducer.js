import { createReducer } from "@reduxjs/toolkit";
import { pushLayer, popLayer, goToLayer } from "./actions";

export default createReducer([],builder => {
    builder.addCase(pushLayer, (path, action) => {
        const {layerId, layerName} = action.payload; 

        path.push ({
            layerId,
            layerName
        })
    }),
    builder.addCase(popLayer, (path, _) => {
        path.pop();
    }),
    builder.addCase(goToLayer, (path, action) => {
        path.splice(action.payload.index, path.length);
    })
})