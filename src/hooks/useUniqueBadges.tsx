import { Category } from '~/types/category.type';
import { getCatSubPairs } from '~/utils/helpers';

export const useUniqueBadges = (categories: Category[], categoriesIds: string[]) => {
    const pairs = getCatSubPairs(categories, categoriesIds);
    return Array.from(new Set(pairs.map((pair) => pair.category._id))).map(
        (id) => pairs.find((pair) => pair.category._id === id)!.category,
    );
};
