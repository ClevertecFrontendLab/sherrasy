import { store } from '~/store/configure-store';
import { AuthStatus } from '~/utils/constant';

import { AlertMessage } from './api-message.type';
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
    isFiltering: boolean;
    hasRecipes: boolean;
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

export type AppState = {
    isLoading: boolean;
    alertMessage: AlertMessage | null;
};

export type UserState = {
    email: string | null;
    authStatus: AuthStatus;
};
