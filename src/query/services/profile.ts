import { TFile } from '~/types/file.type';
import { Profile, ProfileStats } from '~/types/profile.type';

import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-names';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { apiSlice } from '../create-api';

export const profileApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.PROFILE, Tags.USERS, Tags.STATISTIC, Tags.NOTES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllUsers: builder.query<unknown, void>({
                query: () => ({
                    url: ApiEndpoints.USERS,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.PROFILE,
                    name: EndpointNames.GET_USERS,
                }),
                providesTags: [Tags.USERS],
            }),
            getProfile: builder.query<Profile, void>({
                query: () => ({
                    url: ApiEndpoints.PROFILE,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.PROFILE,
                    name: EndpointNames.GET_BLOGGER_BY_ID,
                }),
                providesTags: [Tags.PROFILE],
            }),
            getStats: builder.query<ProfileStats, void>({
                query: () => ({
                    url: ApiEndpoints.PROFILE_STATISTIC,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.PROFILE,
                    name: EndpointNames.GET_PROFILE_STATISTIC,
                }),
                providesTags: [Tags.STATISTIC],
            }),
            deleteProfile: builder.mutation<unknown, undefined>({
                query: () => ({
                    url: ApiEndpoints.PROFILE_DELETE,
                    method: 'DELETE',
                    apiGroupName: ApiGroupNames.PROFILE,
                    name: EndpointNames.DELETE_PROFILE,
                }),
                invalidatesTags: () => [Tags.PROFILE, Tags.USERS, Tags.STATISTIC, Tags.NOTES],
            }),
            createNote: builder.mutation<unknown, undefined>({
                query: (data) => ({
                    url: `${ApiEndpoints.PROFILE}/${ApiEndpoints.PROFILE_NOTE}`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.PROFILE,
                    name: EndpointNames.CREATE_NOTE,
                    body: data,
                }),
                invalidatesTags: () => [Tags.NOTES],
            }),
            deleteNote: builder.mutation<unknown, undefined>({
                query: (id) => ({
                    url: `${ApiEndpoints.PROFILE}/${ApiEndpoints.PROFILE_NOTE}/${id}`,
                    method: 'DELETE',
                    apiGroupName: ApiGroupNames.PROFILE,
                    name: EndpointNames.DELETE_NOTE,
                }),
                invalidatesTags: () => [Tags.NOTES],
            }),
            updateUser: builder.mutation<unknown, unknown>({
                query: (body) => ({
                    url: `${ApiEndpoints.PROFILE}/${ApiEndpoints.PROFILE_UPDATE}`,
                    method: 'PATCH',
                    apiGroupName: ApiGroupNames.PROFILE,
                    name: EndpointNames.UPDATE_PROFILE,
                    body: body,
                }),
                invalidatesTags: [Tags.PROFILE],
            }),
            updatePassword: builder.mutation<unknown, unknown>({
                query: (body) => ({
                    url: `${ApiEndpoints.PROFILE}/${ApiEndpoints.PROFILE_UPDATE_PASSWORD}`,
                    method: 'PATCH',
                    apiGroupName: ApiGroupNames.PROFILE,
                    name: EndpointNames.UPDATE_PASSWORD,
                    body: body,
                }),
                invalidatesTags: [Tags.PROFILE],
            }),
            uploadPhoto: builder.mutation<TFile, FormData>({
                query: (body) => ({
                    url: `${ApiEndpoints.PROFILE}/${ApiEndpoints.PROFILE_PHOTO}`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.PROFILE,
                    name: EndpointNames.UPLOAD_PROFILE_PHOTO,
                    body: body,
                }),
            }),
        }),
    });

export const {
    useGetAllUsersQuery,
    useGetProfileQuery,
    useGetStatsQuery,
    useDeleteNoteMutation,
    useDeleteProfileMutation,
    useCreateNoteMutation,
    useUpdatePasswordMutation,
    useUpdateUserMutation,
    useUploadPhotoMutation,
} = profileApiSlice;
