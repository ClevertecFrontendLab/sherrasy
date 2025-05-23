import { MotionGlobalConfig } from 'framer-motion';
import { StatusCodes } from 'http-status-codes';

import { AlertMessage, ApiMessage } from '~/types/api-message.type';
import { Category, CatSubPair, Subcategory } from '~/types/category.type';
import { MultiselectItem } from '~/types/filter-item.type';
import { ModalType } from '~/types/modal.type';
import { RecipeQueryParam } from '~/types/query-param.type';
import { FullRecipe } from '~/types/recipe.interface';

import { ALERT_MESSAGES } from './alert-messages';
import { ApiBase, CardsLimit } from './constant';
import { TestIdName } from './testId-name.enum';

export const getSortedNewRecipes = (recipes: FullRecipe[]) =>
    [...recipes]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);

export const getSortedJuicyRecipes = (recipes: FullRecipe[]) =>
    [...recipes].sort((a, b) => b.likes - a.likes).slice(0, 10);

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

export const getTabNames = (data: Category[], categoryId?: string): Subcategory[] =>
    data.find(({ category }) => category === categoryId)?.subCategories || [];

export const getMultiselectCategories = (data: Category[]): MultiselectItem[] =>
    data.map(({ title, category, subCategories }) => ({
        name: title,
        id: category,
        elements: subCategories.map((item) => item._id).join(','),
    }));

export const getIsIncluded = (a: string, b: string) => a.toLowerCase().includes(b.toLowerCase());

export const updateImagePath = (imageSrc: string) =>
    imageSrc ? `${ApiBase.Images}${imageSrc}` : imageSrc;

export const formatRecipeWithImages = (recipe: FullRecipe) => ({
    ...recipe,
    image: updateImagePath(recipe.image),
    steps: recipe.steps?.map((step) => ({
        ...step,
        image: updateImagePath(step.image),
    })),
});

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

export const getCatSubPairs = (categories: Category[], subcategoryIds: string[]): CatSubPair[] =>
    categories.flatMap((category) =>
        category.subCategories
            .filter((subcategory) => subcategoryIds?.includes(subcategory._id))
            .map((subcategory) => ({ category, subcategory })),
    ) ?? [];

export const setDataToLocalStorage = (key: string, data: unknown) => {
    const preparedData = JSON.stringify(data);
    localStorage.setItem(key, preparedData);
};

export const getDataFromLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export const getFlowTestId = (type?: ModalType) => {
    switch (type) {
        case 'recoveryEmail':
            return TestIdName.ModalSendEmail;
        case 'recoveryPin':
            return TestIdName.ModalVerificationCode;
        case 'recoveryForm':
            return TestIdName.ModalResetCredentials;
        default:
            return null;
    }
};

const cypressIsRunning = (): boolean => !!(window as unknown as { Cypress: unknown }).Cypress;

export const configureTestMode = (): void => {
    if (cypressIsRunning()) {
        MotionGlobalConfig.skipAnimations = true;
    }
    return;
};

export const createErrorMessage = ({
    status,
    data,
    isAuth,
    isFiltering,
    isClientError,
}: {
    status: number;
    data: ApiMessage;
    isAuth: boolean;
    isFiltering: boolean;
    isClientError: boolean;
}): AlertMessage => {
    const isRecipesNotFound = !isAuth && status === StatusCodes.NOT_FOUND;

    if (isFiltering || isRecipesNotFound) {
        return ALERT_MESSAGES.searchError;
    }

    if (isClientError) {
        return {
            title: data.message,
            description: data.description ?? '',
            type: 'error',
        };
    }

    return ALERT_MESSAGES.serverError;
};
