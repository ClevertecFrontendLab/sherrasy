import { store } from '~/store/configure-store';

import { Category } from './category.type';
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
    hasLoadingError: boolean;
    currentFilters: RecipeFilters;
    pendingFilters: RecipeFilters;
    searchString: string | null;
};

export type CategoryState = {
    categories: Category[] | null;
    isLoading: boolean;
    hasLoadingError: boolean;
    tabCategory: string | null;
    tabSubcategory: string | null;
};
