import { createSlice } from "@reduxjs/toolkit";

const inputParametersSlice = createSlice({
  name: "inputParameters",
  initialState: [],
  reducers: {
    setInputParameters: (_, action) => {
      return action.payload;
    },
    addInputParameter: (state, action) => {
      return [...state, action.payload];
    },
    deleteInputParameterById: (state, action) => {
      const inputParameterId = action.payload;
      return state.filter(
        (inputParameter) => inputParameter.id != inputParameterId
      );
    },
    updateInputParameterById: (state, action) => {
      return state.map((inputParameter) =>
        inputParameter.id == action.payload.id ? action.payload : inputParameter
      );
    },
  },
});

export const {setInputParameters, addInputParameter, deleteInputParameterById, updateInputParameterById} = inputParametersSlice.actions;
export default inputParametersSlice.reducer;