import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { apiSlice } from '~/query/create-api.ts';
import { IFile } from '~/types/file.interface';
import { updateImagePath } from '~/utils/helpers/format-images';

export const filesApiSlice = apiSlice.enhanceEndpoints({}).injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<IFile, FormData>({
            query: (body: FormData) => ({
                url: ApiEndpoints.UPLOAD_FILE,
                method: 'POST',
                apiGroupName: ApiGroupNames.FILE,
                name: EndpointNames.UPLOAD_FILE,
                body: body,
            }),
            transformResponse: (response: IFile) => ({
                ...response,
                url: updateImagePath(response.url),
            }),
        }),
    }),
});

export const { useUploadFileMutation } = filesApiSlice;
