import { RecipeFormData } from '~/components/forms/validation-scheme/recipe.scheme';
import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { updateHasRecipes, updateIsFiltering } from '~/store/recipes/recipes-slice';
import { RecipeQueryParam } from '~/types/query-param.type';
import { FullRecipe, RecipeMeasureUnit, RecipeMeta } from '~/types/recipe.interface';
import { CardsLimit, DEFAULT_ERROR_LOG, SortingBy, SortingDirection } from '~/utils/constant';
import { formatRecipeWithImages } from '~/utils/helpers/format-images';
import { getRecipeQueryString } from '~/utils/helpers/get-request-query';

type RecipeResponse = {
    data: FullRecipe[];
    meta: RecipeMeta;
};

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
            getJuiciestRecipes: builder.query<RecipeResponse, string>({
                query: (query) => ({
                    url: `${ApiEndpoints.RECIPE}${query}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_JUICIEST_RECIPIES,
                }),

                serializeQueryArgs: ({ endpointName }) => endpointName,

                merge: (currentCache, newData) => {
                    const samePage = currentCache.meta.page === newData.meta.page;
                    const newRecipeIds = new Set(newData.data.map((r) => r._id));
                    const filteredPrev = !samePage
                        ? currentCache.data
                        : currentCache.data.filter((recipe) => !newRecipeIds.has(recipe._id));
                    return {
                        data: [...filteredPrev, ...newData.data],
                        meta: newData.meta,
                    };
                },
                transformResponse: ({ data, meta }: RecipeResponse) => ({
                    data: data.map((recipe) => formatRecipeWithImages(recipe)),
                    meta,
                }),
                onCacheEntryAdded: async (_arg, { cacheEntryRemoved }) => {
                    await cacheEntryRemoved;
                },
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
            getMeasureUnits: builder.query<RecipeMeasureUnit[], void>({
                query: () => ({
                    url: ApiEndpoints.MEASURE_UNITS,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.MEASURE_UNITS,
                    name: EndpointNames.GET_MEASURE_UNITS,
                }),
            }),
            createRecipe: builder.mutation<RecipeResponse, RecipeFormData>({
                query: (data: RecipeFormData) => ({
                    url: ApiEndpoints.RECIPE,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.CREATE_RECIPE,
                    body: data,
                }),
                invalidatesTags: [Tags.RECIPES, Tags.JUICY_RECIPES],
            }),

            saveDraftRecipe: builder.mutation<RecipeResponse, RecipeFormData>({
                query: (data: RecipeFormData) => ({
                    url: ApiEndpoints.RECIPE_DRAFT,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.SAVE_RECIPE_DRAFT,
                    body: data,
                }),
                invalidatesTags: [Tags.RECIPES],
            }),

            updateRecipe: builder.mutation<RecipeResponse, RecipeFormData & { _id: string }>({
                query: (data) => ({
                    url: `${ApiEndpoints.RECIPE}/${data._id}`,
                    method: 'PATCH',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.UPDATE_RECIPE,
                    body: data,
                }),
                invalidatesTags: (_result, _error, arg) => [
                    { type: Tags.RECIPE, id: arg._id },
                    Tags.RECIPES,
                    Tags.JUICY_RECIPES,
                ],
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
            }),
        }),
    });

export const {
    useLazyGetRecipesQuery,
    useGetNewRecipesQuery,
    useGetRelevantRecipesQuery,
    useGetRecipesByCategoryQuery,
    useGetJuiciestRecipesQuery,
    useLazyGetJuiciestRecipesQuery,
    useGetRecipeByIdQuery,
    useLazyGetRecipeByIdQuery,
    useGetMeasureUnitsQuery,
    useCreateRecipeMutation,
    useSaveDraftRecipeMutation,
    useUpdateRecipeMutation,
    useDeleteRecipeMutation,
} = recipesApiSlice;
