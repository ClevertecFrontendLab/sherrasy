export interface NutritionValue {
    calories: number;
    fats: number;
    carbohydrates: number;
    proteins?: number;
    protein?: number;
}
export interface Ingredient {
    title: string;
    count: string;
    measureUnit: string;
}
export interface RecipeStep {
    stepNumber: number;
    description: string;
    image: string;
}
export interface RecipeMeasureUnit {
    _id: string;
    name: string;
}

export interface RecipeMeta {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
}
export interface FullRecipe {
    _id: string;
    title: string;
    description: string;
    categoriesIds: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    views: number;
    createdAt: string;
    time: number;
    portions: number;
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    steps: RecipeStep[];
    meat?: string;
    garnish: string;
    authorId: string;
    recommendedBy?: number | null; //temp
}
