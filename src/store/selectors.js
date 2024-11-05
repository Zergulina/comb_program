import { createSelector } from "@reduxjs/toolkit";

const selectLayerPath = (state) => state.layerPath;
const selectInputValues = (state) => state.inputValues;
const selectInputValueId = (_, id) => id;
const selectOutputValues = (state) => state.outputValues;

export const getPrevLayerId = createSelector([selectLayerPath], (layerPath) => {
  return layerPath.length == 0 ? null : layerPath[layerPath.length - 1].id;
});

export const getInputValuesByInputParameterId = createSelector(
  [selectInputValues, selectInputValueId],
  (inputValues, inputValueId) => {
    return inputValues.filter(
      (inputValue) => inputValue.input_parameter_id == inputValueId
    );
  }
);

export const getOutputValueByOutputParameterIdInputValueIdsHash = (outputParameterId, inputValueIdsHash) => createSelector(
  [selectOutputValues],
  (outputValues) => {
    return outputValues.find(
      (outputValue) => outputValue.outputParameterId == outputParameterId && outputValue.inputValueIds.split(/|+/).map(inputValueId => +inputValueId).reduce((accumulator, currentId) => { return accumulator + currentId }, 0) == inputValueIdsHash
    );
  }
)
