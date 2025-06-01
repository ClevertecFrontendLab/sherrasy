import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeFilters, RecipeState } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';

const initialState: RecipeState = {
    isLoading: false,
    hasRecipes: false,
    isFiltering: false,
    currentFilters: {
        categories: null,
        author: null,
        meat_type: null,
        side_type: null,
        allergens: null,
    },
    pendingFilters: {
        categories: null,
        author: null,
        meat_type: null,
        side_type: null,
        allergens: null,
    },
    searchString: null,
    recipeName: null,
};

export const recipeSlice = createSlice({
    name: ReducerName.Recipe,
    initialState,
    reducers: {
        updateIsFiltering: (state, { payload }: PayloadAction<boolean>) => {
            state.isFiltering = payload;
        },
        setRecipeName: (state, { payload }: PayloadAction<string>) => {
            state.recipeName = payload;
        },
        setIsLoadingFiltered: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        updateHasRecipes: (state, { payload }: PayloadAction<boolean>) => {
            state.hasRecipes = payload;
        },
        setSearchRecipeString: (state, { payload }: PayloadAction<string | null>) => {
            state.searchString = payload;
        },
        updateFilter: (
            state,
            action: PayloadAction<{
                key: keyof RecipeFilters;
                value: string[];
                type: 'active' | 'pending';
            }>,
        ) => {
            action.payload.type === 'active'
                ? (state.currentFilters[action.payload.key] = action.payload.value)
                : (state.pendingFilters[action.payload.key] = action.payload.value);
            if (action.payload.key === 'allergens') {
                state.pendingFilters['allergens'] = action.payload.value;
            }
        },
        updateCurrentFilters: (state) => {
            state.currentFilters = state.pendingFilters;
            state.pendingFilters = initialState.currentFilters;
        },
        clearAllergens: (state) => {
            state.currentFilters.allergens = initialState.currentFilters.allergens;
        },
        clearFilters: (state) => {
            state.currentFilters = initialState.currentFilters;
            state.pendingFilters = initialState.currentFilters;
        },
        clearFilteringParams: (state) => {
            state.hasRecipes = initialState.hasRecipes;
            state.isFiltering = initialState.isFiltering;
            state.searchString = initialState.searchString;
        },
    },
    extraReducers() {},
});

export const {
    setSearchRecipeString,
    updateIsFiltering,
    clearFilteringParams,
    updateFilter,
    updateCurrentFilters,
    clearAllergens,
    clearFilters,
    setIsLoadingFiltered,
    updateHasRecipes,
    setRecipeName,
} = recipeSlice.actions;

export default recipeSlice.reducer;
