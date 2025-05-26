import { RecipeQueryParam } from '~/types/query-param.type';

import { CardsLimit } from '../constant';

export const getRecipeQueryString = (query: RecipeQueryParam) => {
    const subcatIds = query.subcategoriesIds ? query.subcategoriesIds : query.categories?.join(',');
    const limit = query.limit ? `limit=${query.limit}` : `limit=${CardsLimit.Default}`;
    const page = query.page ? `&page=${query.page}` : `&page=1`;
    const allergens =
        query.allergens && query.allergens.length ? `&allergens=${query.allergens.join(',')}` : '';
    const searchString = query.searchString ? `&searchString=${query.searchString}` : ``;
    const meat =
        query.meat_type && query.meat_type.length ? `&meat=${query.meat_type.join(',')}` : '';
    const garnish =
        query.side_type && query.side_type.length ? `&garnish=${query.side_type.join(',')}` : '';
    const subcategories = subcatIds ? `&subcategoriesIds=${subcatIds}` : '';
    const sortBy = query.sortBy ? `&sortBy=${query.sortBy}` : ``;
    const sortOrder = query.sortOrder ? `&sortOrder=${query.sortOrder}` : ``;
    return `?${limit}${page}${allergens}${searchString}${meat}${garnish}${subcategories}${sortBy}${sortOrder}`;
};
