import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Category } from '~/types/category.type';
import { CategoryState } from '~/types/state.type';
import { LocalStorageKey, ReducerName } from '~/utils/constant';
import { getDataFromLocalStorage } from '~/utils/helpers/localstorage-helpers';

const fallback: Category[] = getDataFromLocalStorage(LocalStorageKey.Categories);

const initialState: CategoryState = {
    categories: Array.isArray(fallback) && fallback.length > 0 ? fallback : [],
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
        setBackupCategories: (state, { payload }: PayloadAction<Category[]>) => {
            state.categories = payload;
        },
    },
    extraReducers() {},
});

export const { setCurrentParams, setBackupCategories } = categorySlice.actions;

export default categorySlice.reducer;
