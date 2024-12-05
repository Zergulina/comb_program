import { createSelector } from "@reduxjs/toolkit";

const selectLayerPath = (state) => state.layerPath;
const selectInputValues = (state) => state.inputValues;
const selectOutputValues = (state) => state.outputValues;
const selectOutputParameters = (state) => state.outputParameters;
const selectInputParameters = (state) => state.inputParameters;

export const getPrevLayerId = createSelector([selectLayerPath], (layerPath) => {
  return layerPath.length == 0 ? null : layerPath[layerPath.length - 1].id;
});

export const getInputValuesByInputParameterId = (inputParameterId) =>
  createSelector([selectInputValues], (inputValues) => {
    return inputValues.filter(
      (inputValue) => inputValue.input_parameter_id == inputParameterId
    );
  });

export const getOutputValueByOutputParameterIdInputValueIdsHash = (
  outputParameterId,
  inputValueIdsHash
) => {
  createSelector([selectOutputValues], (outputValues) => {
    return outputValues.find(
      (outputValue) =>
        outputValue.output_parameter_id == outputParameterId &&
        outputValue.input_value_ids === inputValueIdsHash
    );
  });
};

export const buildElementTable = createSelector(
  [
    selectOutputParameters,
    selectInputParameters,
    selectInputValues,
    selectOutputValues,
  ],
  (outputParameters, inputParameters, inputValues, outputValues) => {
    const validInputParameterIds = new Set();
    inputValues.forEach(x => validInputParameterIds.add(x.input_parameter_id));
    inputParameters = inputParameters.filter(x => validInputParameterIds.has(x.id));
    const table = [];
    table.push([
      ...inputParameters.map((x) => {
        var y = { tableValue: x, editable: false };
        return y;
      }),
      ...outputParameters.map((x) => {
        var y = { tableValue: x, editable: false };
        return y;
      }),
    ]);
    if (inputValues.length == 0) {
      return table;
    }
    const inputValuesSortedByParameters = [];
    inputParameters.forEach((x) =>
      inputValuesSortedByParameters.push(
        inputValues.filter(
          (inputValue) => inputValue.input_parameter_id == x.id
        )
      )
    );
    const inputValuesCombinations = combinations(inputValuesSortedByParameters);
    inputValuesCombinations.forEach((inputValuesCombination) => {
      const tableRow = inputValuesCombination.map((x) => {
        var y = { tableValue: x, editable: false };
        return y;
      });

      outputParameters.forEach((outputParameter) => {
        const inputValueIdsHash = inputValuesCombination
          .sort((a, b) => a.id - b.id)
          .reduce((accumulator, inputValue) => {
            return accumulator + ("|" + inputValue.id + "|");
          }, "");

        tableRow.push({
          tableValue: outputValues.find(
            (outputValue) =>
              outputValue.output_parameter_id == outputParameter.id &&
              outputValue.input_value_ids === inputValueIdsHash
          ),
          editable: true,
        });
      });
      table.push(tableRow)
    });
    return table;
  }
);

function combinations(v) {
  let result = [];
  let currentCombination = [];

  function _combinations(v, currentCombination, i, result) {
    if (i === v.length) {
      result.push([...currentCombination]);
    } else {
      for (let j = 0; j < v[i].length; j++) {
        currentCombination.push(v[i][j]);
        _combinations(v, currentCombination, i + 1, result);
        currentCombination.pop();
      }
    }
  }

  _combinations(v, currentCombination, 0, result);

  return result;
}
