import { Category, Subcategory } from '~/types/category.type';
import { MultiselectItem } from '~/types/filter-item.type';
import { FullRecipe, Ingredient } from '~/types/recipe.interface';

import { ApiBase } from './constant';

export const getSortedNewRecipes = (recipes: FullRecipe[]) =>
    [...recipes]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);

export const getSortedJuicyRecipes = (recipes: FullRecipe[]) =>
    [...recipes].sort((a, b) => b.likes - a.likes).slice(0, 10);

export const getTabNames = (data: Category[], categoryId?: string): Subcategory[] =>
    data.find(({ category }) => category === categoryId)?.subCategories || [];

export const getMultiselectCategories = (data: Category[]): MultiselectItem[] =>
    data.map((item) => ({ name: item.title, id: item.category }));

export const getIsIncluded = (a: string, b: string) => a.toLowerCase().includes(b.toLowerCase());

export const updateImagePath = (imageSrc: string) =>
    imageSrc ? `${ApiBase.Images}${imageSrc}` : imageSrc;

export const getRandomElement = <T extends Record<string, unknown>>(
    arr: T[],
    excludeId?: string,
): T | undefined => {
    if (!arr.length) return undefined;

    const filteredArr = excludeId ? arr.filter((item) => item['_id'] !== excludeId) : arr;

    if (!filteredArr.length) return undefined;

    const randomIndex = Math.floor(Math.random() * filteredArr.length);
    return filteredArr[randomIndex];
};

// Filters helpers

export const getCategoriesMatch = (category: string[], categories: string[] | null): boolean => {
    if (!categories?.length) return true;
    return categories.some((item) => category.includes(item));
};

export const getMeatSideMatch = (
    recipeValue: string | undefined,
    options: string[] | null,
): boolean => {
    if (!options?.length) return true;
    if (!recipeValue) return false;
    return options.includes(recipeValue);
};

export const getAllergensMatch = (
    ingredients: Ingredient[],
    allergens: string[] | null,
): boolean => {
    if (!allergens?.length) return false;
    const normalizedAllergens = allergens
        .map((allergen) =>
            allergen
                .split(/\(|\)/)
                .map((part) => part.trim())
                .filter((part) => part.length > 0),
        )
        .flat();
    return ingredients.some(({ title }) =>
        normalizedAllergens.some((allergen) => getIsIncluded(title, allergen)),
    );
};

export const getSearchMatch = (title: string, searchString: string | null): boolean => {
    if (!searchString) return true;
    return getIsIncluded(title, searchString);
};
