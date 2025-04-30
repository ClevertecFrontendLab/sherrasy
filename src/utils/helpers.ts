import { MultiselectItem } from '~/types/filter-item.type';
import { MenuItem, MenuSubcategory } from '~/types/menu-item.type';
import { FullRecipe, Ingredient } from '~/types/recipe.interface';

export const getSortedNewRecipes = (recipes: FullRecipe[]) =>
    [...recipes]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

export const getSortedJuicyRecipes = (recipes: FullRecipe[]) =>
    [...recipes].sort((a, b) => b.likes - a.likes).slice(0, 10);

export const getTabNames = (data: MenuItem[], categoryId?: string): MenuSubcategory[] =>
    data.find(({ category }) => category === categoryId)?.subCategories || [];

export const getMultiselectCategories = (data: MenuItem[]): MultiselectItem[] =>
    data.map((item) => ({ name: item.title, id: item.category }));

export const getIsIncluded = (a: string, b: string) => a.toLowerCase().includes(b.toLowerCase());

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
