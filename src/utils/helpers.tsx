import { MenuItem, MenuSubcategory } from '~/types/menu-item.type';
import { FullRecipe } from '~/types/recipe.interface';

export const getSortedNewRecipes = (recipes: FullRecipe[]) =>
    [...recipes]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

export const getTabNames = (data: MenuItem[]): MenuSubcategory[] =>
    data.find(({ tag }) => tag === 'vegan')?.elements || [];
