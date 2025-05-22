import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ContentHeader } from '~/components/content-header/content-header';
import { Layout } from '~/components/layout/layout';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { RelevantKitchenSection } from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { Tags } from '~/query/constants/tags';
import {
    recipesApiSlice,
    useGetJuiciestRecipesQuery,
    useLazyGetRecipesQuery,
} from '~/query/services/recipes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { clearFilteringParams } from '~/store/recipes/recipes-slice';
import { getIsFilteringRecipes, getRecipeQuery } from '~/store/recipes/selectors';
import { RecipeQueryParam } from '~/types/query-param.type';
import { DEFAULT_PAGE } from '~/utils/constant';
import { getRecipeQueryString } from '~/utils/helpers';

const DefaultParams: RecipeQueryParam = {
    limit: 8,
    page: 1,
    sortBy: 'likes',
    sortOrder: 'desc',
};

export const JuicyPage = () => {
    const dispatch = useAppDispatch();
    const isFiltering = useAppSelector(getIsFilteringRecipes);
    const [triggerRecipes, { data: recipes = [] }] = useLazyGetRecipesQuery();
    const [page, setPage] = useState(DEFAULT_PAGE);
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
    const { data: recipesData, isFetching } = useGetJuiciestRecipesQuery(query, {
        refetchOnMountOrArgChange: true,
    });
    const recipesCurrent = isFiltering ? recipes : recipesData?.data;
    const isLastPage = isFiltering
        ? isFiltering
        : Boolean(recipesData?.meta && recipesData.meta.page === recipesData.meta.totalPages);

    const loadRecipes = async () => {
        if (!isFetching && !isLastPage) {
            setPage((prev) => prev + 1);
        }
    };

    const handleFilterRecipes = async () => await triggerRecipes(queryFilters);

    useEffect(
        () => () => {
            setPage(DEFAULT_PAGE);
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
                    pl={{ base: 4, sm: 5 }}
                    pr={{ base: 0, sm: 5 }}
                    alignSelf='start'
                    width='100%'
                >
                    <RecipesList
                        recipes={recipesCurrent ?? []}
                        isLastPage={isLastPage}
                        handleLoadMore={loadRecipes}
                    />
                </Box>
                <RelevantKitchenSection />
            </Layout>
        </>
    );
};
