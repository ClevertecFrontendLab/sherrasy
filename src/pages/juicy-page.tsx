import { Box, useToast } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { showAlertToast } from '~/components/alert-error/show-alert';
import { ContentHeader } from '~/components/content-header/content-header';
import { Layout } from '~/components/layout/layout';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { RelevantKitchenSection } from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { Tags } from '~/query/constants/tags';
import { useGetCategoriesQuery } from '~/query/services/categories';
import {
    recipesApiSlice,
    useGetJuiciestRecipesQuery,
    useLazyGetRecipesQuery,
} from '~/query/services/recipes';
import { getCategories } from '~/store/categories/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    clearFilteringParams,
    updateHasRecipes,
    updateIsFiltering,
    updateIsLoadingList,
    updateIsLoadingRecipe,
} from '~/store/recipes/recipes-slice';
import { getIsFilteringRecipes, getRecipeQuery } from '~/store/recipes/selectors';
import { Category } from '~/types/category.type';
import { RecipeQueryParam } from '~/types/query-param.type';
import { getRandomElement, getRecipeQueryString } from '~/utils/helpers';

const DefaultParams: RecipeQueryParam = {
    limit: 8,
    sortBy: 'likes',
    sortOrder: 'desc',
};

export const JuicyPage = () => {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const { data: dataCategories = [], isError: isCatError } = useGetCategoriesQuery();
    const backupCategories = useAppSelector(getCategories);
    const isFiltering = useAppSelector(getIsFilteringRecipes);
    const [triggerRecipes, { data: recipes = [] }] = useLazyGetRecipesQuery();
    const categories = isCatError ? backupCategories : dataCategories;
    const [page, setPage] = useState(1);
    const currentCategory = useMemo(() => getRandomElement<Category>(categories), [categories]);
    const queryFilters = useAppSelector((state) =>
        getRecipeQuery(state, {
            ...DefaultParams,
            page,
        }),
    );
    const query = getRecipeQueryString({
        ...DefaultParams,
        page,
    });
    const {
        data: recipesData,
        isFetching,
        isLoading,
    } = useGetJuiciestRecipesQuery(query, {
        refetchOnMountOrArgChange: true,
    });
    const recipesCurrent = isFiltering ? recipes : recipesData?.data;
    const isLastPage = isFiltering
        ? isFiltering
        : Boolean(recipesData?.meta && recipesData.meta.page === recipesData.meta.totalPages);

    const loadRecipes = async () => {
        if (!isFetching && !isLoading && !isLastPage) {
            setPage((prev) => prev + 1);
        }
    };

    const handleFilterRecipes = async () => {
        const queryString = getRecipeQueryString(queryFilters);
        const result = await triggerRecipes(queryString);

        if (result.error) {
            showAlertToast('search', toast);
            dispatch(updateIsLoadingRecipe(false));
            dispatch(updateIsLoadingList(false));
            return;
        }

        if (result.data) {
            dispatch(updateIsFiltering());
            dispatch(updateIsLoadingRecipe(false));
            dispatch(updateIsLoadingList(false));
            dispatch(updateHasRecipes((result.data.length > 0).toString()));
        }
    };

    useEffect(
        () => () => {
            setPage(1);
            dispatch(recipesApiSlice.util.invalidateTags([Tags.JUICY_RECIPES]));
            dispatch(clearFilteringParams());
        },
        [dispatch],
    );

    return (
        <>
            <Layout>
                <ContentHeader headline='Самое сочное' handleFilterRecipes={handleFilterRecipes} />
                <Box
                    mt={{ base: 8, sm: 4, lg: 3 }}
                    pl={{ base: 4, sm: 5, lg: '17.75rem' }}
                    pr={{ base: 0, sm: 5, lg: '17.375rem' }}
                    alignSelf='start'
                    width='100%'
                >
                    <RecipesList
                        recipes={recipesCurrent ?? []}
                        isLastPage={isLastPage}
                        handleLoadMore={loadRecipes}
                    />
                </Box>
                <RelevantKitchenSection categoryInfo={currentCategory} />
            </Layout>
        </>
    );
};
