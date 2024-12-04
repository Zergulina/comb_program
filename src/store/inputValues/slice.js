import { createSlice } from "@reduxjs/toolkit";

const inputValuesSlice = createSlice({
  name: "inputValues",
  initialState: [],
  reducers: {
    setInputValues: (_, action) => {
      return action.payload;
    },
    addInputValue: (state, action) => {
      return [...state, action.payload];
    },
    addInputValues: (state, action) => {
      return [...state, ...action.payload];
    },
    deleteInputValueById: (state, action) => {
      const inputValueId = action.payload;
      return state.filter((inputValue) => inputValue.id != inputValueId);
    },
    deleteInputValueByInputParameterId: (state, action) => {
      const inputParameterId = action.payload;
      return state.filter((inputValue) => inputValue.input_parameter_id != inputParameterId);
    },
    updateInputValueById: (state, action) => {
        return state.map(inputValue => inputValue.id == action.payload.id ? action.payload : inputValue);
    },
  },
});

export const {setInputValues, addInputValue, addInputValues, deleteInputValueById, deleteInputValueByInputParameterId, updateInputValueById} = inputValuesSlice.actions;
export default inputValuesSlice.reducer;