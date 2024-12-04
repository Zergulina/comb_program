import { createSlice } from "@reduxjs/toolkit";

const outputValuesSlice = createSlice({
  name: "outputValues",
  initialState: [],
  reducers: {
    setOutputValues: (_, action) => {
      return action.payload;
    },
    updateOutputValueById: (state, action) => {
      return state.map((outputValue) => 
        outputValue.id == action.payload.id ? action.payload : outputValue
      );
    },
  },
});

export const { setOutputValues, updateOutputValueById } = outputValuesSlice.actions;
export default outputValuesSlice.reducer;