import { createSlice } from "@reduxjs/toolkit";
import warehouseData from '../../warehouse.json';

const dataSlice = createSlice({
    name: 'data',
    initialState: { data: warehouseData },
    reducers: {
        setData: (state, action) => {
            state.data = warehouseData
        },
        setSearch: (state, action) => {
            state.data = action.payload
        },
        setFilteredData: (state, action) => {
            state.data = action.payload
        },
        setUpdatedData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { setData, setSearch, setFilteredData, setUpdatedData } = dataSlice.actions;

export default dataSlice.reducer;