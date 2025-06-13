import { jwtDecode } from 'jwt-decode';

import { TokenPayloadData } from '~/types/token-payload.type';

import { LocalStorageKey } from '../constant';

export const getBloggerCardName = (firstName: string, lastName: string) =>
    `${firstName} ${lastName}`;

export const getCurrentUserId = () => {
    const token = localStorage.getItem(LocalStorageKey.AToken);
    if (!token) return null;

    const decoded = jwtDecode<TokenPayloadData>(token);
    return decoded.userId;
};

export const checkRecipeAuthor = (recipeAuthorId: string) => {
    const userId = getCurrentUserId();
    return userId === recipeAuthorId;
};
