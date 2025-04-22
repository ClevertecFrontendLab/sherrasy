import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeState } from '~/types/state.type';
import { newMockData } from '~/utils/data/mock-cards.json';

const initialState: RecipeState = {
    recipes: null,
    isLoading: false,
    hasLoading: false,
    currentFilters: {
        categories: null,
        author: null,
        meat: null,
        side: null,
        alergies: null,
    },
    searchString: null,
};

export const recipeSlice = createSlice({
    name: 'RECIPE',
    initialState,
    reducers: {
        setSearchRecipeString: (state, { payload }: PayloadAction<string | null>) => {
            state.searchString = payload;
        },
        fetchRecipes: (state) => {
            state.recipes = newMockData;
        },
    },
    extraReducers() {},
});

export const { setSearchRecipeString, fetchRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
