import { createSelector } from '@reduxjs/toolkit';

import { FullRecipe } from '~/types/recipe.interface';
import { RecipeFilters, State } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';
import {
    getAllergensMatch,
    getCategoriesMatch,
    getMeatSideMatch,
    getSearchMatch,
} from '~/utils/helpers';

import { getTabInfo } from '../categories/selectors';

export const getRecipes = (state: Pick<State, ReducerName.Recipe>): FullRecipe[] | null =>
    state[ReducerName.Recipe].recipes;

export const getIsFilteringRecipes = (state: Pick<State, ReducerName.Recipe>): boolean =>
    state[ReducerName.Recipe].isFiltering;

export const getRecipeId = (_state: Pick<State, ReducerName.Recipe>, id?: string) => id;

export const getRecipesSearchString = (state: Pick<State, ReducerName.Recipe>): string =>
    state[ReducerName.Recipe].searchString || '';

export const getActiveFilters = (state: Pick<State, ReducerName.Recipe>): RecipeFilters =>
    state.RECIPE.currentFilters;

export const getPendingFilters = (state: Pick<State, ReducerName.Recipe>): RecipeFilters =>
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
