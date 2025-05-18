import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { StatusCodes } from 'http-status-codes';

import { AlertMessage, ApiQueryError } from '~/types/api-message.type';
import { ALERT_MESSAGES } from '~/utils/alert-messages';
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
                status &&
                status >= StatusCodes.BAD_REQUEST &&
                status < StatusCodes.INTERNAL_SERVER_ERROR;
            if (status !== StatusCodes.BAD_REQUEST && status < StatusCodes.INTERNAL_SERVER_ERROR)
                return result;
            const message: AlertMessage = {
                title: data.message,
                description: data.description ?? '',
                type: 'error',
            };
            const errorMessage = isFiltering
                ? ALERT_MESSAGES.searchError
                : isClientError
                  ? message
                  : ALERT_MESSAGES.serverError;

            handleError(api, errorMessage);
        }

        return result;
    } catch (error) {
        console.log(error, 'err');
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
