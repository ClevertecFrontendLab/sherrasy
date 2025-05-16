import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { ApiBase, DEFAULT_ERROR_MESSAGE, LocalStorageKey } from '~/utils/constant';

import { handleError, handleTokenRefresh, setLoadingState } from './api-helpers';
import { EndpointNames } from './constants/endpoint-names';

export const baseQuery = fetchBaseQuery({
    baseUrl: ApiBase.Main,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem(LocalStorageKey.AToken);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const updatedBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const { endpoint } = api;
    const isFiltering = endpoint === EndpointNames.GET_RECIPES;

    try {
        setLoadingState(api, isFiltering, true);
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            const tokenRefreshed = await handleTokenRefresh(baseQuery, api, extraOptions);
            if (tokenRefreshed) {
                result = await baseQuery(args, api, extraOptions);
            }
        }

        // if (result.error) {
        //     const { status, data } = result.error;
        //     const isServerError = status && status >= 500;
        //     const isClientError = status && status >= 400 && status < 500;

        //     const errorMessage = isClientError ? data : DEFAULT_ERROR_MESSAGE;

        //     handleError(api, errorMessage);
        // }

        return result;
    } catch (error) {
        handleError(api, DEFAULT_ERROR_MESSAGE);
        throw error;
    } finally {
        setLoadingState(api, isFiltering, false);
    }
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: updatedBaseQuery,
    endpoints: () => ({}),
});
