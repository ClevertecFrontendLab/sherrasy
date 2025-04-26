import { store } from '~/store/configure-store';

import { FullRecipe } from './recipe.interface';

export type State = ReturnType<typeof store.getState>;

export type RecipeFilters = {
    categories: string[] | null;
    author: string[] | null;
    meat_type: string[] | null;
    side_type: string[] | null;
    allergens: string[] | null;
};
export type RecipeState = {
    recipes: FullRecipe[] | null;
    isLoading: boolean;
    isFiltering: boolean;
    hasLoading: boolean;
    currentFilters: RecipeFilters;
    pendingFilters: RecipeFilters;
    searchString: string | null;
    category: string | null;
    subcategory: string | null;
};
