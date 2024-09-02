import { createSlice } from "@reduxjs/toolkit";

const layersSlice = createSlice({
  name: "layers",
  initialState: [],
  reducers: {
    addLayer: (state, action) => {
      return [...state, action.payload];
    },
    deleteLayerById: (state, action) => {
      const layerId = action.payload;
      return [...state.filter((layer) => layer.id != layerId)];
    },
    updateLayer: (state, action) => {
      return state.map((layer) =>
        layer.id == action.payload.id ? action.payload : layer
      );
    },
    setLayers: (_, action) => {
      return action.payload;
    },
  },
});

export const { addLayer, deleteLayerById, updateLayer, setLayers } =
  layersSlice.actions;
export default layersSlice.reducer;
