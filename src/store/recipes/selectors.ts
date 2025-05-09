import { createSelector } from '@reduxjs/toolkit';

import { RecipeQueryParam } from '~/types/query-param.type';
import { RecipeFilters, State } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';

export const getIsFilteringRecipes = (state: Pick<State, ReducerName.Recipe>): boolean =>
    state[ReducerName.Recipe].isFiltering;

export const getRecipeId = (_state: Pick<State, ReducerName.Recipe>, id?: string) => id;
export const getRecipeParams = (
    _state: Pick<State, ReducerName.Recipe>,
    sortParams?: { limit?: number; page?: number; sortOrder?: 'asc' | 'desc'; sortBy?: string },
) => sortParams;

export const getRecipesSearchString = (state: Pick<State, ReducerName.Recipe>): string =>
    state[ReducerName.Recipe].searchString || '';

export const getActiveFilters = (state: Pick<State, ReducerName.Recipe>): RecipeFilters =>
    state.RECIPE.currentFilters;

export const getPendingFilters = (state: Pick<State, ReducerName.Recipe>): RecipeFilters =>
    state.RECIPE.pendingFilters;

export const getRecipeQuery = createSelector(
    [getActiveFilters, getPendingFilters, getRecipesSearchString, getRecipeParams],
    (aFilters, pFilters, searchString, sortParams): RecipeQueryParam => ({
        ...aFilters,
        ...pFilters,
        searchString,
        ...sortParams,
    }),
);

export const getIsLoadingFiltered = (state: Pick<State, ReducerName.Recipe>): boolean =>
    state.RECIPE.isLoading;

export const getHasRecipes = (state: Pick<State, ReducerName.Recipe>): boolean =>
    state.RECIPE.hasRecipes;
