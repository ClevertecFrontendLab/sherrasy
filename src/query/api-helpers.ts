import { BaseQueryApi, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { setAppLoader, setAppMessage } from '~/store/app-status/app-slice';
import { setIsLoadingFiltered } from '~/store/recipes/recipes-slice';
import { AlertMessage, ApiMeta } from '~/types/api-message.type';
import { LocalStorageKey } from '~/utils/constant';

import { ApiEndpoints } from './constants/api';

export const setLoadingState = (api: BaseQueryApi, isFiltering: boolean, isLoading: boolean) => {
    if (isFiltering) {
        api.dispatch(setIsLoadingFiltered(isLoading));
    } else {
        api.dispatch(setAppLoader(isLoading));
    }
};

export const handleTokenRefresh = async (
    baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    api: BaseQueryApi,
    extraOptions: object,
) => {
    const refreshResult = await baseQuery(
        {
            url: ApiEndpoints.AUTH_REFRESH,
            method: 'GET',
        },
        api,
        extraOptions,
    );
    if (refreshResult?.data) {
        const response = (refreshResult.meta as ApiMeta)?.response;

        const newToken = response?.headers.get('Authentication-Access');

        if (newToken) {
            localStorage.setItem(LocalStorageKey.AToken, newToken);
        }
        return true;
    }

    localStorage.removeItem(LocalStorageKey.AToken);
    return false;
};

export const handleError = (api: BaseQueryApi, apiMessage: AlertMessage | null) => {
    api.dispatch(setAppMessage(apiMessage));
};
