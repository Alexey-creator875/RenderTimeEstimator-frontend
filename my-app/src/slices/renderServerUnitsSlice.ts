import { createSlice } from "@reduxjs/toolkit";

export const MIN_RAM = 8;
export const MAX_RAM = 128;

const renderServerUnitsSlice = createSlice({
    name: "renderServerUnits",
    initialState: {
        minValue: MIN_RAM,
        maxValue: MAX_RAM,
    },
    reducers: {
        setMinValue(state, {payload}) {
            state.minValue = payload
        },
        setMaxValue(state, {payload}) {
            state.maxValue = payload
        },
        resetFilter(state) {
            state.minValue = MIN_RAM
            state.maxValue = MAX_RAM
        },
    },
});

export const {
    setMinValue: setMinValueAction,
    setMaxValue: setMaxValueAction,
    resetFilter: resetFilterAction,
} = renderServerUnitsSlice.actions

export default renderServerUnitsSlice.reducer
