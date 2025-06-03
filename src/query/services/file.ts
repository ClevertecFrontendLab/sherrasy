import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { apiSlice } from '~/query/create-api.ts';
import { TFile } from '~/types/file.type';

export const filesApiSlice = apiSlice.enhanceEndpoints({}).injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<TFile, FormData>({
            query: (body: FormData) => ({
                url: ApiEndpoints.UPLOAD_FILE,
                method: 'POST',
                apiGroupName: ApiGroupNames.FILE,
                name: EndpointNames.UPLOAD_FILE,
                body: body,
            }),
        }),
    }),
});

export const { useUploadFileMutation } = filesApiSlice;
