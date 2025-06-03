import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { Blogger, BloggersFullData } from '~/types/blogger.type';

export const bloggersApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.BLOGGERS, Tags.BLOGGER],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getBloggers: builder.query<BloggersFullData, string>({
                query: (query) => ({
                    url: `${ApiEndpoints.BLOGGERS}?${query}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.BLOGGERS,
                    name: EndpointNames.GET_BLOGGERS,
                }),
                providesTags: [Tags.BLOGGERS],
            }),
            getBloggerById: builder.query<Blogger, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.BLOGGERS}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.BLOGGERS,
                    name: EndpointNames.GET_BLOGGER_BY_ID,
                }),
                providesTags: (_result, _error, id) => [{ type: Tags.BLOGGER, id }],
            }),
            subscribeToBlogger: builder.mutation<unknown, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.BLOGGERS}/${id}`,
                    method: 'PATCH',
                    apiGroupName: ApiGroupNames.BLOGGERS,
                    name: EndpointNames.SUBSCRIBE_TO_BLOGGER,
                }),
                invalidatesTags: [Tags.BLOGGERS],
            }),
        }),
    });

export const { useGetBloggersQuery, useGetBloggerByIdQuery } = bloggersApiSlice;
