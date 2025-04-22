import { store } from '~/store/configure-store';

import { FullRecipe } from './recipe.interface';

export type State = ReturnType<typeof store.getState>;

export type RecipeState = {
    recipes: FullRecipe[] | null;
    isLoading: boolean;
    hasLoading: boolean;
    currentFilters: {
        categories: string[] | null;
        author: string[] | null;
        meat: string[] | null;
        side: string[] | null;
        alergies: string[] | null;
    };
    searchString: string | null;
};
