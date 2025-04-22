import { MultiselectItem } from '~/types/filter-item.type';
import { MenuItem, MenuSubcategory } from '~/types/menu-item.type';
import { FullRecipe } from '~/types/recipe.interface';

export const getSortedNewRecipes = (recipes: FullRecipe[]) =>
    [...recipes]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

export const getTabNames = (data: MenuItem[], categoryId?: string): MenuSubcategory[] =>
    data.find(({ tag }) => tag === categoryId)?.elements || [];

export const getMultiselectCategories = (data: MenuItem[]): MultiselectItem[] =>
    data.map((item) => ({ name: item.groupName, id: item.tag }));
