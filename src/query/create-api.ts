import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { setAppError } from '~/store/app-status/app-slice';
import { ApiBase, LocalStorageKey } from '~/utils/constant';

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
    const errorText = isFiltering ? 'search' : 'load';

    try {
        setLoadingState(api, isFiltering, true);
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            const tokenRefreshed = await handleTokenRefresh(baseQuery, api, extraOptions);
            if (tokenRefreshed) {
                result = await baseQuery(args, api, extraOptions);
            }
        }

        if (result.error) {
            handleError(api, errorText);
        } else {
            api.dispatch(setAppError(null));
        }

        return result;
    } catch (error) {
        handleError(api, errorText);
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
