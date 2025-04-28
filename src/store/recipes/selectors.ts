import { createSelector } from '@reduxjs/toolkit';

import { FullRecipe } from '~/types/recipe.interface';
import { RecipeFilters, State } from '~/types/state.type';
import {
    getAllergensMatch,
    getCategoriesMatch,
    getMeatSideMatch,
    getSearchMatch,
} from '~/utils/helpers';

export const getRecipes = (state: Pick<State, 'RECIPE'>): FullRecipe[] | null =>
    state['RECIPE'].recipes;

export const getIsFilteringRecipes = (state: Pick<State, 'RECIPE'>): boolean =>
    state['RECIPE'].isFiltering;

export const getRecipeId = (_state: Pick<State, 'RECIPE'>, id?: string) => id;

export const getTabInfo = createSelector(
    [
        (state: Pick<State, 'RECIPE'>) => state['RECIPE'].category,
        (state: Pick<State, 'RECIPE'>) => state['RECIPE'].subcategory,
    ],
    (category, subcategory) => ({ category, subcategory }),
);

export const getRecipesSearchString = (state: Pick<State, 'RECIPE'>): string =>
    state['RECIPE'].searchString || '';

export const getActiveFilters = (state: Pick<State, 'RECIPE'>): RecipeFilters =>
    state.RECIPE.currentFilters;

export const getPendingFilters = (state: Pick<State, 'RECIPE'>): RecipeFilters =>
    state.RECIPE.pendingFilters;

export const getRecipeById = createSelector(
    [getRecipes, getRecipeId],
    (recipes, id): FullRecipe | undefined =>
        id && recipes ? recipes.find((recipe) => recipe.id === id) : undefined,
);

export const getRecipesByTab = createSelector(
    [getRecipes, getTabInfo],
    (recipes, { category: tabCategory, subcategory: tabSubcategory }) => {
        if (!recipes || recipes.length === 0) {
            return [];
        }
        if (!tabCategory && !tabSubcategory) {
            return recipes;
        }
        return recipes.filter(({ category, subcategory }) => {
            if (tabCategory !== undefined && tabSubcategory !== undefined) {
                const matchingIndex = subcategory.findIndex((sub, index) => {
                    const catIndex = index > category?.length - 1 ? 0 : index;
                    return sub === tabSubcategory && category[catIndex] === tabCategory;
                });
                return matchingIndex !== -1;
            }
            return true;
        });
    },
);

export const getFilteredRecipes = createSelector(
    [getRecipesByTab, getRecipesSearchString, getActiveFilters],
    (
        recipes,
        searchString,
        { categories, meat_type, side_type, allergens },
    ): FullRecipe[] | null => {
        if (!recipes) return null;
        return recipes.filter(
            ({ title, category, ingredients, meat, side }) =>
                getSearchMatch(title, searchString) &&
                !getAllergensMatch(ingredients, allergens) &&
                getCategoriesMatch(category, categories) &&
                getMeatSideMatch(meat, meat_type) &&
                getMeatSideMatch(side, side_type),
        );
    },
);
