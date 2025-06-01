import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { apiSlice } from '~/query/create-api.ts';
import { RecipeMeasureUnit } from '~/types/recipe.interface';

export const measureUnitsApiSlice = apiSlice.enhanceEndpoints({}).injectEndpoints({
    endpoints: (builder) => ({
        getMeasureUnits: builder.query<RecipeMeasureUnit[], void>({
            query: () => ({
                url: ApiEndpoints.MEASURE_UNITS,
                method: 'GET',
                apiGroupName: ApiGroupNames.MEASURE_UNITS,
                name: EndpointNames.GET_MEASURE_UNITS,
            }),
        }),
    }),
});

export const { useGetMeasureUnitsQuery } = measureUnitsApiSlice;
