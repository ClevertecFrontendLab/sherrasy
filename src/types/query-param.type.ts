export type RecipeQueryParam = {
    page?: number;
    limit?: number;
    allergens?: string;
    searchString?: string;
    meat?: string;
    garnish?: string;
    subcategoriesIds?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};
