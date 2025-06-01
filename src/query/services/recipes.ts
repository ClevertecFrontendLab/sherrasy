import { RecipeFormData } from '~/components/forms/validation-scheme/recipe.scheme';
import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { setAppMessage } from '~/store/app-status/app-slice';
import { updateHasRecipes, updateIsFiltering } from '~/store/recipes/recipes-slice';
import { RecipeQueryParam } from '~/types/query-param.type';
import { FullRecipe, RecipeMeta } from '~/types/recipe.interface';
import { ALERT_MESSAGES } from '~/utils/alert-messages';
import { CardsLimit, DEFAULT_ERROR_LOG, SortingBy, SortingDirection } from '~/utils/constant';
import { formatRecipeWithImages } from '~/utils/helpers/format-images';
import { getRecipeQueryString } from '~/utils/helpers/get-request-query';

type RecipeResponse = {
    data: FullRecipe[];
    meta: RecipeMeta;
};
type RecipeMutationResponse = FullRecipe;

export const recipesApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPES, Tags.RECIPE, Tags.JUICY_RECIPES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipes: builder.query<FullRecipe[], RecipeQueryParam>({
                query: (queryParams) => {
                    const queryString = getRecipeQueryString(queryParams);
                    return {
                        url: `${ApiEndpoints.RECIPE}${queryString}`,
                        method: 'GET',
                        apiGroupName: ApiGroupNames.RECIPES,
                        name: EndpointNames.GET_RECIPES,
                    };
                },
                transformResponse: ({ data }: RecipeResponse) =>
                    data.map((recipe) => formatRecipeWithImages(recipe)),
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        const hasData = data && data.length > 0;
                        dispatch(updateIsFiltering(true));
                        dispatch(updateHasRecipes(hasData));
                    } catch (error) {
                        console.error(DEFAULT_ERROR_LOG, error);
                    }
                },
                providesTags: (result) =>
                    result
                        ? [
                              ...result.map(({ _id }) => ({ type: Tags.RECIPE as const, id: _id })),
                              Tags.RECIPES,
                          ]
                        : [Tags.RECIPES],
            }),
            getNewRecipes: builder.query<FullRecipe[], void>({
                query: () => ({
                    url: `${ApiEndpoints.RECIPE}?sortOrder=${SortingDirection.Descending}&sortBy=${SortingBy.Date}&limit=${CardsLimit.New}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_NEW_RECIPIES,
                }),
                transformResponse: ({ data }: RecipeResponse) =>
                    data.map((recipe) => formatRecipeWithImages(recipe)),
                providesTags: [Tags.RECIPES],
            }),
            getRelevantRecipes: builder.query<FullRecipe[], string>({
                query: (id: string) => ({
                    url: `${ApiEndpoints.RECIPIES_BY_CATEGORY}/${id}?limit=${CardsLimit.RelativeKitchen}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RELEVANT_RECIPIES,
                }),
                transformResponse: ({ data }: RecipeResponse) =>
                    data.map((recipe) => formatRecipeWithImages(recipe)),
                providesTags: [Tags.RECIPES],
            }),
            getRecipesByCategory: builder.query<FullRecipe[], string>({
                query: (id: string) => ({
                    url: `${ApiEndpoints.RECIPIES_BY_CATEGORY}/${id}?limit=${CardsLimit.Default}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPIES_BY_CATEGORY,
                }),
                transformResponse: ({ data }: RecipeResponse) =>
                    data.map((recipe) => formatRecipeWithImages(recipe)),
                providesTags: [Tags.RECIPES],
            }),
            getJuiciestPaginated: builder.infiniteQuery<
                RecipeResponse,
                RecipeQueryParam,
                { page: number }
            >({
                infiniteQueryOptions: {
                    initialPageParam: { page: 1 },
                    getNextPageParam: (lastPage: {
                        meta: { page: number; totalPages: number };
                    }) => {
                        const nextPage = lastPage.meta.page + 1;
                        return nextPage > lastPage.meta.totalPages ? undefined : { page: nextPage };
                    },
                },
                query: ({ queryArg, pageParam }) => {
                    const page = pageParam?.page || 1;
                    return {
                        url: `${ApiEndpoints.RECIPE}`,
                        method: 'GET',
                        params: { ...queryArg, page },
                        apiGroupName: ApiGroupNames.RECIPES,
                        name: EndpointNames.GET_JUICIEST_PAGINATED,
                    };
                },
                transformResponse: ({ data, meta }: RecipeResponse) => ({
                    data: data.map((recipe) => formatRecipeWithImages(recipe)),
                    meta,
                }),
                providesTags: [Tags.RECIPES, Tags.JUICY_RECIPES],
            }),
            getJuiciestRecipes: builder.query<RecipeResponse, string>({
                query: (query) => ({
                    url: `${ApiEndpoints.RECIPE}${query}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_JUICIEST_RECIPIES,
                }),
                transformResponse: ({ data, meta }: RecipeResponse) => ({
                    data: data.map((recipe) => formatRecipeWithImages(recipe)),
                    meta,
                }),
                providesTags: [Tags.RECIPES, Tags.JUICY_RECIPES],
            }),
            getRecipeById: builder.query<FullRecipe, string>({
                query: (id: string) => ({
                    url: `${ApiEndpoints.RECIPE}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPE_BY_ID,
                }),
                transformResponse: (recipe: FullRecipe) => formatRecipeWithImages(recipe),
                providesTags: (_result, _error, id) => [{ type: Tags.RECIPE, id }],
            }),
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
        }),
    });

export const {
    useLazyGetRecipesQuery,
    useGetNewRecipesQuery,
    useGetRelevantRecipesQuery,
    useGetRecipesByCategoryQuery,
    useGetJuiciestRecipesQuery,
    useGetJuiciestPaginatedInfiniteQuery,
    useGetRecipeByIdQuery,
    useLazyGetRecipeByIdQuery,
    useCreateRecipeMutation,
    useSaveDraftRecipeMutation,
    useUpdateRecipeMutation,
    useDeleteRecipeMutation,
    useLikeRecipeMutation,
    useBookmarkRecipeMutation,
} = recipesApiSlice;
