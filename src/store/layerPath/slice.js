import { createSlice } from "@reduxjs/toolkit";

const layerPathSlice = createSlice({
    name: "layerPath",
    initialState: [],
    reducers: {
        pushLayer: (state, action) => {
            return [...state, action.payload];
        },
        popLayer: (state, _) => {
            let path = [...state];
            path.splice(path.length-1, 1);
            return path;
        },
        goToLayer: (state, action) => {
            let path = [...state];
            path.splice(action.payload + 1, path.length);
            return path;
        }
    }
})

export const {pushLayer, popLayer, goToLayer} = layerPathSlice.actions;
export default layerPathSlice.reducer;