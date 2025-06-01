import { jwtDecode } from 'jwt-decode';

import { ModalType } from '~/types/modal.type';
import { TokenPayloadData } from '~/types/token-payload.type';

import { AppRoute, LocalStorageKey } from '../constant';
import { TestIdName } from '../testId-name.enum';

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

export const checkRecipeAuthor = (recipeAuthorId: string) => {
    const token = localStorage.getItem(LocalStorageKey.AToken);
    if (!token) return false;

    const decoded = jwtDecode<TokenPayloadData>(token);
    return decoded.userId === recipeAuthorId;
};

export const isRecipeEditOrCreatePath = (pathname: string): boolean => {
    const newRecipePath = AppRoute.NewRecipe;
    const editRecipePath = AppRoute.EditRecipe.split('/:')[0];

    return pathname === newRecipePath || pathname.startsWith(editRecipePath);
};
