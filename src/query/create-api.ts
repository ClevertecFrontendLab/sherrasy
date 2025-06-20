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
import { createErrorMessage } from '~/utils/helpers/create-error-message';

import { handleError, handleTokenRefresh, setLoadingState } from './api-helpers';
import { API_MESSAGES } from './api-messages';
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
    const isSubscription = endpoint === EndpointNames.SUBSCRIBE_TO_BLOGGER;
    const isAuth = [
        EndpointNames.AUTH_CHECK_AUTH,
        EndpointNames.AUTH_VERIFY_OTP,
        EndpointNames.AUTH_FORGOT_PASSWORD,
    ].some((item) => item.includes(endpoint));
    const isRecipeMutation = [
        EndpointNames.CREATE_RECIPE,
        EndpointNames.UPDATE_RECIPE,
        EndpointNames.DELETE_RECIPE,
        EndpointNames.SAVE_RECIPE_DRAFT,
    ].some((item) => item.includes(endpoint)); // TODO: временное, изменить отображение ошибок
    try {
        if (!isSubscription) {
            setLoadingState(api, isFiltering, true);
        }
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401 || result?.error?.status === 403) {
            const tokenRefreshed = await handleTokenRefresh(baseQuery, api, extraOptions);
            if (tokenRefreshed) {
                result = await baseQuery(args, api, extraOptions);
            }
        }

        if (result.error) {
            const { status, data } = result.error as ApiQueryError;
            const isClientError =
                status >= StatusCodes.BAD_REQUEST && status < StatusCodes.INTERNAL_SERVER_ERROR;

            if (isRecipeMutation) {
                const endpointMessages = API_MESSAGES[endpoint as EndpointNames];
                if (endpointMessages && status in endpointMessages) {
                    handleError(api, endpointMessages[status as keyof typeof endpointMessages]);
                    return result;
                }
            }

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
        if (!isSubscription) {
            setLoadingState(api, isFiltering, false);
        }
    }
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: updatedBaseQuery,
    endpoints: () => ({}),
});
