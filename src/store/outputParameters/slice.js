import { createSlice } from "@reduxjs/toolkit";

const outputParametersSlice = createSlice({
  name: "outputParameters",
  initialState: [],
  reducers: {
    setOutputParameters: (_, action) => {
      return action.payload;
    },
    addOutputParameter: (state, action) => {
      return [...state, action.payload];
    },
    deleteOutputParameterById: (state, action) => {
      const outputParameterId = action.payload;
      return state.filter(
        (outputParameter) => outputParameter.id != outputParameterId
      );
    },
    updateOutputParameterById: (state, action) => {
      return state.map((outputParameter) =>
        outputParameter.id == action.payload.id ? action.payload : outputParameter
      );
    },
  },
});

export const {setOutputParameters, addOutputParameter, deleteOutputParameterById, updateOutputParameterById} = outputParametersSlice.actions;
export default outputParametersSlice.reducer;