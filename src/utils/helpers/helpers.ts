import { BloggerShort } from '~/types/blogger.type';
import { ModalType } from '~/types/modal.type';

import { AppRoute } from '../constant';
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

export const isRecipeEditOrCreatePath = (pathname: string): boolean => {
    const newRecipePath = AppRoute.NewRecipe;
    const editRecipePath = AppRoute.EditRecipe.split('/:')[0];

    return pathname === newRecipePath || pathname.startsWith(editRecipePath);
};

export const findNameById = <T extends { name?: string }>(
    array: T[],
    id: string,
    getId: (item: T) => string | undefined,
): string => {
    const item = array.find((item) => getId(item) === id);
    return item?.name || id;
};

export function getSubscribersList(users: BloggerShort[], subscribers: string[]): BloggerShort[] {
    return users.filter((user) => subscribers.includes(user.id));
}
