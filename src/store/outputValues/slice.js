import { createSlice } from "@reduxjs/toolkit";

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

const outputValuesSlice = createSlice({
  name: "outputValues",
  initialState: [],
  reducers: {
    setOutputValues: (_, action) => {
      return action.payload;
    },
    addOutputValue: (state, action) => {
      return [...state, action.payload];
    },
    deleteOutputValue: (state, action) => {
      const outputParameterId = action.payload.outputParameterId;
      const inputValueIds = action.payload.inputValueIds;
      return state.filter(
        (outputValue) => outputValue.outputParameterId != outputParameterId && arraysEqual(outputValue.inputValueIds, inputValueIds)
      );
      
    },
    updateOutputValue: (state, action) => {
      return state.map((outputValue) =>
        outputValue.outputParameterId == action.payload.outputParameterId && arraysEqual(outputValue.inputValueIds, action.payload.inputValueIds) ? action.payload : outputValue
      );
    },
  },
});

export const {setOutputValues, addOutputValue, deleteOutputValueById, updateOutputValueById} = outputValuesSlice.actions;
export default outputValuesSlice.reducer;