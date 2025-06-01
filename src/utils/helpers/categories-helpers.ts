import { Category, CatSubPair, Subcategory } from '~/types/category.type';
import { MultiselectItem } from '~/types/filter-item.type';

export const getTabNames = (data: Category[], categoryId?: string): Subcategory[] =>
    data.find(({ category }) => category === categoryId)?.subCategories || [];

export const getMultiselectCategories = (data: Category[]): MultiselectItem[] =>
    data.map(({ title, category, subCategories }) => ({
        name: title,
        id: category,
        elements: subCategories.map((item) => item._id).join(','),
    }));

export const getCatSubPairs = (categories: Category[], subcategoryIds: string[]): CatSubPair[] =>
    categories.flatMap((category) =>
        category.subCategories
            .filter((subcategory) => subcategoryIds?.includes(subcategory._id))
            .map((subcategory) => ({ category, subcategory })),
    ) ?? [];
