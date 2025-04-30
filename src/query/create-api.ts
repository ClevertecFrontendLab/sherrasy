import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiBase } from '~/utils/constant';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: ApiBase.Main }),
    endpoints: () => ({}),
});
