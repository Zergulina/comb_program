import { createSlice } from "@reduxjs/toolkit";

const outputValuesSlice = createSlice({
  name: "outputValues",
  initialState: [],
  reducers: {
    setOutputValues: (_, action) => {
      return action.payload;
    },
    updateOutputValue: (state, action) => {
      return state.map((outputValue) => {
        const outputValueId = action.payload.Id;
        outputValue.id == outputValueId ? action.payload : outputValue
      });
    },
  },
});

export const { setOutputValues, updateOutputValueById } = outputValuesSlice.actions;
export default outputValuesSlice.reducer;