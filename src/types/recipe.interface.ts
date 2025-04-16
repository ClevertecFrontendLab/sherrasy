export interface Recipe {
    id: number;
    title: string;
    description: string;
    tag: string;
    bookmarks: number;
    likes: number;
}
export interface RecipeWithImage extends Recipe {
    image: string;
    recommendedBy?: number | null;
}

export interface NutritionValue {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
}
export interface Ingredient {
    title: string;
    count: string;
    measureUnit: string;
}
export interface RecipeStep {
    stepNumber: number;
    description: string;
    image?: string;
}

export interface FullRecipe {
    id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    steps: RecipeStep[];
    meat?: string;
    side?: string;
}
