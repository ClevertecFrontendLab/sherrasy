import { store } from '~/store/configure-store';

import { Category } from './category.type';

export type State = ReturnType<typeof store.getState>;

export type RecipeFilters = {
    categories: string[] | null;
    author: string[] | null;
    meat_type: string[] | null;
    side_type: string[] | null;
    allergens: string[] | null;
};
export type RecipeState = {
    isLoading: boolean;
    isLoadingList: boolean;
    isFiltering: boolean;
    hasRecipes: string;
    currentFilters: RecipeFilters;
    pendingFilters: RecipeFilters;
    searchString: string | null;
};

export type CategoryState = {
    categories: Category[];
    isLoading: boolean;
    hasLoadingError: boolean;
    tabCategory: string | null;
    tabSubcategory: string | null;
};
