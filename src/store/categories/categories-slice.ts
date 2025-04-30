import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoryState } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';

const initialState: CategoryState = {
    categories: null,
    isLoading: false,
    hasLoadingError: false,
    tabCategory: null,
    tabSubcategory: null,
};

export const categorySlice = createSlice({
    name: ReducerName.Category,
    initialState,
    reducers: {
        setCurrentParams: (
            state,
            { payload }: PayloadAction<{ category?: string; subcategory?: string }>,
        ) => {
            state.tabCategory = payload.category || null;
            state.tabSubcategory = payload.subcategory || null;
        },
    },
    extraReducers() {},
});

export const { setCurrentParams } = categorySlice.actions;

export default categorySlice.reducer;
