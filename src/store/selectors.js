import { createSelector } from "@reduxjs/toolkit";

const selectLayerPath = state => state.layerPath

export const getPrevLayerId = createSelector(
    [selectLayerPath],
    (layerPath) => {
        return layerPath.length == 0 ? null : layerPath[layerPath.length - 1].id
    }
)
