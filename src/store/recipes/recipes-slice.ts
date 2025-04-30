import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeFilters, RecipeState } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';
import { newMockData } from '~/utils/data/mock-cards.json';

const initialState: RecipeState = {
    recipes: null,
    isLoading: false,
    hasLoadingError: false,
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
};

export const recipeSlice = createSlice({
    name: ReducerName.Recipe,
    initialState,
    reducers: {
        updateIsFiltering: (state) => {
            state.isFiltering =
                !!state.searchString?.trim() ||
                Object.values(state.currentFilters).some((filter) => filter?.length ?? 0 > 0);
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
        fetchRecipes: (state) => {
            state.recipes = newMockData;
        },
    },
    extraReducers() {},
});

export const {
    setSearchRecipeString,
    fetchRecipes,
    updateIsFiltering,
    updateFilter,
    updateCurrentFilters,
    clearAllergens,
    clearFilters,
} = recipeSlice.actions;

export default recipeSlice.reducer;
