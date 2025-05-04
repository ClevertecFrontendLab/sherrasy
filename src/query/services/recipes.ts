import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { RecipeQueryParam } from '~/types/query-param.type';
import { FullRecipe, RecipeMeta } from '~/types/recipe.interface';
import { updateImagePath } from '~/utils/helpers';

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
            getNewRecipes: builder.query<FullRecipe[], void>({
                query: () => ({
                    url: `${ApiEndpoints.RECIPE}?sortOrder=desc&sortBy=createdAt&limit=10`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_NEW_RECIPIES,
                }),
                transformResponse: ({ data }: RecipeResponse) =>
                    data.map((recipe) => ({
                        ...recipe,
                        image: updateImagePath(recipe.image),
                        steps: recipe.steps.map((step) => ({
                            ...step,
                            image: updateImagePath(step.image),
                        })),
                    })),
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
                    data.map((recipe) => ({
                        ...recipe,
                        image: updateImagePath(recipe.image),
                        steps: recipe.steps.map((step) => ({
                            ...step,
                            image: updateImagePath(step.image),
                        })),
                    })),
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
                    data.map((recipe) => ({
                        ...recipe,
                        image: updateImagePath(recipe.image),
                        steps: recipe.steps.map((step) => ({
                            ...step,
                            image: updateImagePath(step.image),
                        })),
                    })),
                providesTags: [Tags.RECIPES],
            }),
            getJuiciestRecipes: builder.query<RecipeResponse, RecipeQueryParam>({
                query: ({ limit, page = 1 }) => ({
                    url: `${ApiEndpoints.RECIPE}?sortOrder=desc&sortBy=likes&limit=${limit}&page=${page}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_JUICIEST_RECIPIES,
                }),

                serializeQueryArgs: ({ endpointName }) => endpointName,

                merge: (currentCache, newData) => {
                    const newRecipeIds = new Set(newData.data.map((r) => r._id));
                    const filteredPrev = currentCache.data.filter(
                        (recipe) => !newRecipeIds.has(recipe._id),
                    );
                    return {
                        data: [...filteredPrev, ...newData.data],
                        meta: newData.meta,
                    };
                },
                transformResponse: ({ data, meta }: RecipeResponse) => ({
                    data: data.map((recipe) => ({
                        ...recipe,
                        image: updateImagePath(recipe.image),
                        steps: recipe.steps.map((step) => ({
                            ...step,
                            image: updateImagePath(step.image),
                        })),
                    })),
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
                transformResponse: (recipe: FullRecipe) => ({
                    ...recipe,
                    image: updateImagePath(recipe.image),
                    steps: recipe.steps.map((step) => ({
                        ...step,
                        image: updateImagePath(step.image),
                    })),
                }),
                providesTags: [Tags.RECIPES],
            }),
        }),
    });

export const {
    useGetNewRecipesQuery,
    useGetRelevantRecipesQuery,
    useGetRecipesByCategoryQuery,
    useGetJuiciestRecipesQuery,
    useLazyGetJuiciestRecipesQuery,
    useGetRecipeByIdQuery,
    useLazyGetRecipeByIdQuery,
} = recipesApiSlice;
