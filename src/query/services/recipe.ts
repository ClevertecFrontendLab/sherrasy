import { RecipeFormData } from '~/components/forms/validation-scheme/recipe.scheme';
import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { setAppMessage } from '~/store/app-status/app-slice';
import { FullRecipe, RecipeMeta } from '~/types/recipe.interface';
import { ALERT_MESSAGES } from '~/utils/alert-messages';
import { DEFAULT_ERROR_LOG } from '~/utils/constant';

type RecipeResponse = {
    data: FullRecipe[];
    meta: RecipeMeta;
};
type RecipeMutationResponse = FullRecipe;

export const recipeApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPES, Tags.RECIPE, Tags.JUICY_RECIPES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            createRecipe: builder.mutation<RecipeMutationResponse, RecipeFormData>({
                query: (data: RecipeFormData) => ({
                    url: ApiEndpoints.RECIPE,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.CREATE_RECIPE,
                    body: data,
                }),
                invalidatesTags: [Tags.RECIPES, Tags.JUICY_RECIPES],
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        dispatch(setAppMessage(ALERT_MESSAGES.publishRecipeSuccess));
                    } catch (error) {
                        console.error(DEFAULT_ERROR_LOG, error);
                    }
                },
            }),
            saveDraftRecipe: builder.mutation<RecipeMutationResponse, RecipeFormData>({
                query: (data: RecipeFormData) => ({
                    url: ApiEndpoints.RECIPE_DRAFT,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.SAVE_RECIPE_DRAFT,
                    body: data,
                }),
                invalidatesTags: [Tags.RECIPES],
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        dispatch(setAppMessage(ALERT_MESSAGES.publishDraftSuccess));
                    } catch (error) {
                        console.error(DEFAULT_ERROR_LOG, error);
                    }
                },
            }),
            updateRecipe: builder.mutation<
                RecipeMutationResponse,
                { id: string; body: RecipeFormData }
            >({
                query: ({ id, body }) => ({
                    url: `${ApiEndpoints.RECIPE}/${id}`,
                    method: 'PATCH',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.UPDATE_RECIPE,
                    body: body,
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type: Tags.RECIPE, id: arg.id },
                    Tags.RECIPES,
                    Tags.JUICY_RECIPES,
                ],
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        dispatch(setAppMessage(ALERT_MESSAGES.publishRecipeSuccess));
                    } catch (error) {
                        console.error(DEFAULT_ERROR_LOG, error);
                    }
                },
            }),
            deleteRecipe: builder.mutation<RecipeResponse, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECIPE}/${id}`,
                    method: 'DELETE',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.DELETE_RECIPE,
                }),
                invalidatesTags: (_result, _error, id) => [
                    { type: Tags.RECIPE, id },
                    Tags.RECIPES,
                    Tags.JUICY_RECIPES,
                ],
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        dispatch(setAppMessage(ALERT_MESSAGES.removeRecipeSuccess));
                    } catch (error) {
                        console.error(DEFAULT_ERROR_LOG, error);
                    }
                },
            }),
            likeRecipe: builder.mutation<RecipeResponse, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECIPE}/${id}/${ApiEndpoints.LIKE}`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.LIKE_RECIPE,
                }),
                invalidatesTags: (_result, _error, id) => [
                    { type: Tags.RECIPE, id },
                    Tags.RECIPES,
                    Tags.JUICY_RECIPES,
                ],
            }),
            bookmarkRecipe: builder.mutation<RecipeResponse, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECIPE}/${id}/${ApiEndpoints.BOOKMARK}`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.BOOKMARK_RECIPE,
                }),
                invalidatesTags: (_result, _error, id) => [
                    { type: Tags.RECIPE, id },
                    Tags.RECIPES,
                    Tags.JUICY_RECIPES,
                ],
            }),
            recommendRecipe: builder.mutation<RecipeResponse, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECOMMEND_RECIPE}/${id}`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.RECOMMEND_RECIPE,
                }),
                invalidatesTags: (_result, _error, id) => [
                    { type: Tags.RECIPE, id },
                    Tags.RECIPES,
                    Tags.JUICY_RECIPES,
                ],
            }),
        }),
    });

export const {
    useCreateRecipeMutation,
    useSaveDraftRecipeMutation,
    useUpdateRecipeMutation,
    useDeleteRecipeMutation,
    useLikeRecipeMutation,
    useBookmarkRecipeMutation,
} = recipeApiSlice;
