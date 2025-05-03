import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { FullRecipe, RecipeMeta } from '~/types/recipe.interface';
import { updateImagePath } from '~/utils/helpers';

type RecipeResponse = {
    data: FullRecipe[];
    meta: RecipeMeta;
};

export const recipesApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPES, Tags.RECIPE],
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
            getRecipesByCategory: builder.query<FullRecipe[], string>({
                query: (id: string) => ({
                    url: `${ApiEndpoints.RECIPIES_BY_CATEGORY}/${id}?limit=5`,
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

export const { useGetNewRecipesQuery, useGetRecipesByCategoryQuery, useGetRecipeByIdQuery } =
    recipesApiSlice;
