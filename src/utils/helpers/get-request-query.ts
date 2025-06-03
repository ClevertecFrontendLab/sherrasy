import { CookBlogQueryParam, RecipeQueryParam } from '~/types/query-param.type';

import { CardsLimit } from '../constant';

const createQueryParam = (key: string, value: unknown, defaultValue?: string | number): string => {
    if (Array.isArray(value)) {
        return value.length > 0 ? `${key}=${value.join(',')}` : '';
    }

    if (value === null || typeof value === 'undefined' || value === '') {
        if (defaultValue !== undefined && defaultValue !== null) {
            return `${key}=${defaultValue}`;
        }
        return '';
    }

    if (typeof value === 'boolean') {
        return `${key}=${value}`;
    }

    if (typeof value === 'number' || typeof value === 'string') {
        return `${key}=${value}`;
    }

    return '';
};

const getQueryString = (values: string[]) => values.filter(Boolean).join('&');

export const getRecipeQueryString = (query: RecipeQueryParam) => {
    const {
        subcategoriesIds,
        categories,
        limit,
        page,
        allergens,
        searchString,
        meat_type,
        side_type,
        sortBy,
        sortOrder,
    } = query;

    const subcatIds = subcategoriesIds || categories?.join(',');

    const params = [
        createQueryParam('limit', limit, CardsLimit.Default),
        createQueryParam('page', page),
        createQueryParam('allergens', allergens),
        createQueryParam('searchString', searchString),
        createQueryParam('meat', meat_type),
        createQueryParam('garnish', side_type),
        createQueryParam('subcategoriesIds', subcatIds),
        createQueryParam('sortBy', sortBy),
        createQueryParam('sortOrder', sortOrder),
    ];

    return getQueryString(params);
};

export const getCookBlogQueryString = (query: CookBlogQueryParam, isSubscription: boolean) => {
    const { limit, currentUserId, bloggerId } = query;
    const params = [
        createQueryParam('limit', limit),
        createQueryParam(isSubscription ? 'fromUserId' : 'currentUserId', currentUserId),
        createQueryParam(isSubscription ? 'toUserId' : 'bloggerId', bloggerId),
    ];

    return getQueryString(params);
};
