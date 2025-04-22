import { createSelector } from '@reduxjs/toolkit';

import { FullRecipe } from '~/types/recipe.interface';
import { State } from '~/types/state.type';

export const getRecipes = (state: Pick<State, 'RECIPE'>): FullRecipe[] | null =>
    state['RECIPE'].recipes;

export const getRecipeId = (_state: Pick<State, 'RECIPE'>, id?: string) => id;

export const getTabInfo = (
    _state: Pick<State, 'RECIPE'>,
    category?: string,
    subcategory?: string,
) => ({
    category,
    subcategory,
});

export const getRecipesSearchString = (state: Pick<State, 'RECIPE'>): string =>
    state['RECIPE'].searchString || '';

export const getRecipeById = createSelector(
    [getRecipes, getRecipeId],
    (recipes, id): FullRecipe | undefined =>
        id && recipes ? recipes.find((recipe) => recipe.id === id) : undefined,
);

export const getRecipesByTab = createSelector(
    [getRecipes, getTabInfo],
    (recipes, { category, subcategory }) => {
        if (!recipes || recipes.length === 0) {
            return [];
        }

        return recipes.filter((recipe) => {
            if (category !== undefined && subcategory !== undefined) {
                const matchingIndex = recipe.category.findIndex(
                    (cat, index) => cat === category && recipe.subcategory[index] === subcategory,
                );
                return matchingIndex !== -1;
            }
            return true;
        });
    },
);

export const getFilteredRecipesByName = createSelector(
    [getRecipes, getRecipesSearchString],
    (recipes, searchString): FullRecipe[] | null => {
        if (!recipes) return null;
        return recipes.filter(
            (recipe) =>
                !searchString || recipe.title.toLowerCase().includes(searchString.toLowerCase()),
        );
    },
);
