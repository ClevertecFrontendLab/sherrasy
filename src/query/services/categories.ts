import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { Category } from '~/types/category.type';

export const categoryApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.CATEGORIES, Tags.CATEGORY],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getCategories: builder.query<Category[], void>({
                query: () => ({
                    url: ApiEndpoints.CATEGORY,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORIES,
                    name: EndpointNames.GET_CATEGORIES,
                }),
                providesTags: [Tags.CATEGORIES],
                transformResponse: (data: Category[]) =>
                    data.filter((item: Category) => item.subCategories),
            }),
            getCategoryById: builder.query<Category[], string>({
                query: (id) => ({
                    url: `${ApiEndpoints.CATEGORY}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORIES,
                    name: EndpointNames.GET_CATEGORY_BY_ID,
                }),
                providesTags: [Tags.CATEGORY],
            }),
        }),
    });

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApiSlice;
