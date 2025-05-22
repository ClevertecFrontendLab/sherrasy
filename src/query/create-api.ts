import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { StatusCodes } from 'http-status-codes';

import { ApiQueryError } from '~/types/api-message.type';
import { ALERT_MESSAGES } from '~/utils/alert-messages';
import { ApiBase, LocalStorageKey } from '~/utils/constant';
import { createErrorMessage } from '~/utils/helpers';

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
    const isAuth = endpoint.includes('Auth');
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
            const { status, data } = result.error as ApiQueryError;
            const isClientError =
                status >= StatusCodes.BAD_REQUEST && status < StatusCodes.INTERNAL_SERVER_ERROR;

            if (
                status !== StatusCodes.BAD_REQUEST &&
                status < StatusCodes.INTERNAL_SERVER_ERROR &&
                isAuth
            ) {
                return result;
            }

            const errorMessage = createErrorMessage({
                status,
                data,
                isAuth,
                isFiltering,
                isClientError,
            });

            handleError(api, errorMessage);
        }

        return result;
    } catch (error) {
        handleError(api, ALERT_MESSAGES.serverError);
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
