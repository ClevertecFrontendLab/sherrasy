export type RecipeQueryParam = {
    page?: number;
    limit?: number;
    meat_type?: string[] | null;
    side_type?: string[] | null;
    allergens?: string[] | null;
    searchString?: string;
    meat?: string[];
    garnish?: string[];
    categories?: string[] | null;
    subcategoriesIds?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};

export type CookBlogQueryParam = {
    limit?: number | string;
    currentUserId?: string;
};
