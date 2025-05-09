import { useMemo } from 'react';

import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';
import { Category, Subcategory } from '~/types/category.type';
import { getRandomElement } from '~/utils/helpers';

export const useRandomCategory = (categoryId?: string) => {
    const categories = useAppSelector(getCategories);

    return useMemo(() => {
        const category = getRandomElement<Category>(categories, categoryId);
        const subcategories = category?.subCategories ?? [];
        const subcategory = getRandomElement<Subcategory>(subcategories)?._id;

        return {
            currentCategory: category,
            currentSubcategory: subcategory,
        };
    }, [categories, categoryId]);
};
