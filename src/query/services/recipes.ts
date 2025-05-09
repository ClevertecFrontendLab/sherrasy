import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { updateHasRecipes, updateIsFiltering } from '~/store/recipes/recipes-slice';
import { RecipeQueryParam } from '~/types/query-param.type';
import { FullRecipe, RecipeMeta } from '~/types/recipe.interface';
import { formatRecipeWithImages, getRecipeQueryString } from '~/utils/helpers';

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
                        dispatch(updateIsFiltering(hasData));
                        dispatch(updateHasRecipes(hasData.toString()));
                    } catch (error) {
                        console.error('Failed to fetch categories:', error);
                    }
                },
                providesTags: [Tags.RECIPES],
            }),
            getNewRecipes: builder.query<FullRecipe[], void>({
                query: () => ({
                    url: `${ApiEndpoints.RECIPE}?sortOrder=desc&sortBy=createdAt&limit=10`,
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
                    url: `${ApiEndpoints.RECIPIES_BY_CATEGORY}/${id}?limit=5`,
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
                    url: `${ApiEndpoints.RECIPIES_BY_CATEGORY}/${id}?limit=8`,
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
                providesTags: [Tags.RECIPES],
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
} = recipesApiSlice;
