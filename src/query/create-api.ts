import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { setAppError, setAppLoader } from '~/store/app-status/app-slice';
import { setIsLoadingFiltered } from '~/store/recipes/recipes-slice';
import { ApiBase } from '~/utils/constant';

import { EndpointNames } from './constants/endpoint-names';

const baseQuery = fetchBaseQuery({ baseUrl: ApiBase.Main });

export const updatedBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const endpointName = api.endpoint;
    const isFiltering = endpointName === EndpointNames.GET_RECIPES;
    const errorText = isFiltering ? 'search' : 'load';
    if (isFiltering) {
        api.dispatch(setIsLoadingFiltered(true));
    } else {
        api.dispatch(setAppLoader(true));
    }
    try {
        const result = await baseQuery(args, api, extraOptions);

        if (result.error) {
            api.dispatch(setAppLoader(false));
            api.dispatch(setAppError(errorText));
        } else {
            api.dispatch(setAppError(null));
        }

        return result;
    } catch (e) {
        api.dispatch(setAppLoader(false));
        api.dispatch(setAppError(errorText));
        throw e;
    } finally {
        if (isFiltering) {
            api.dispatch(setIsLoadingFiltered(false));
        } else {
            api.dispatch(setAppLoader(false));
        }
    }
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: updatedBaseQuery,
    endpoints: () => ({}),
});
