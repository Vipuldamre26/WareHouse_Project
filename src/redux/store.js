import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';
import dataSlice from './slices/dataSlice';

const store = configureStore({
    reducer: {
        search: searchSlice,
        data: dataSlice,
    }
});

export default store;
