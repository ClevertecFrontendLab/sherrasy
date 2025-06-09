import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { BloggerFull, BloggersFullData } from '~/types/blogger.type';
import { SubscriptionBodyParam } from '~/types/query-param.type';

export type BloggerParams = {
    bloggerId: string;
    queryStr: string;
};

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
            getBloggerById: builder.query<BloggerFull, string>({
                query: (query) => ({
                    url: `${ApiEndpoints.BLOGGERS}/${query}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.BLOGGERS,
                    name: EndpointNames.GET_BLOGGER_BY_ID,
                }),
                providesTags: (result) => [{ type: Tags.BLOGGER, id: result?.bloggerInfo._id }],
            }),
            subscribeToBlogger: builder.mutation<unknown, SubscriptionBodyParam>({
                query: (body) => ({
                    url: `${ApiEndpoints.BLOGGER_SUBSCRIBE}`,
                    method: 'PATCH',
                    apiGroupName: ApiGroupNames.BLOGGERS,
                    name: EndpointNames.SUBSCRIBE_TO_BLOGGER,
                    body: body,
                }),
                invalidatesTags: [Tags.BLOGGERS],
            }),
        }),
    });

export const { useGetBloggersQuery, useGetBloggerByIdQuery, useSubscribeToBloggerMutation } =
    bloggersApiSlice;
