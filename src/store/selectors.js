import { createSelector } from "@reduxjs/toolkit";

const selectLayerPath = (state) => state.layerPath;
const selectInputValues = (state) => state.inputValues;
const selectInputValueId = (state, id) => id;

export const getPrevLayerId = createSelector([selectLayerPath], (layerPath) => {
  return layerPath.length == 0 ? null : layerPath[layerPath.length - 1].id;
});

export const getInputValuesByInputParameterId = createSelector(
  [selectInputValues,selectInputValueId],
  (inputValues, inputValueId) => {
    return inputValues.filter(
      (inputValue) => inputValue.input_parameter_id == inputValueId
    );
  }
);
