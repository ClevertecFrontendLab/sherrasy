import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ContentHeader } from '~/components/content-header/content-header';
import { Layout } from '~/components/layout/page-layout/layout';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { RelevantKitchenSection } from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { Tags } from '~/query/constants/tags';
import {
    recipesApiSlice,
    useGetJuiciestPaginatedInfiniteQuery,
    useLazyGetRecipesQuery,
} from '~/query/services/recipes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { clearFilteringParams } from '~/store/recipes/recipes-slice';
import { getIsFilteringRecipes, getRecipeQuery } from '~/store/recipes/selectors';
import { RecipeQueryParam } from '~/types/query-param.type';
import { DEFAULT_PAGE } from '~/utils/constant';
import { TestIdName } from '~/utils/testId-name.enum';

const DefaultParams: RecipeQueryParam = {
    limit: 8,
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
    const {
        data: recipesData,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isLoading,
    } = useGetJuiciestPaginatedInfiniteQuery(DefaultParams);

    const recipesCurrent = isFiltering
        ? recipes
        : (recipesData?.pages.flatMap((page) => page.data) ?? []);
    const isLastPage = isFiltering ? isFiltering : !hasNextPage && !isLoading;
    const loadRecipes = () => {
        fetchNextPage();
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
                    <Flex direction='column' gap={{ base: 3, sm: 3.5 }} justify='center'>
                        <RecipesList recipes={recipesCurrent ?? []} />
                        {!isLastPage && (
                            <Button
                                bg='lime.400'
                                mt={1}
                                size='md'
                                alignSelf='center'
                                data-test-id={TestIdName.LoadMoreBtn}
                                onClick={loadRecipes}
                            >
                                <Text fontWeight={600} fontSize='md' lineHeight={6}>
                                    {isFetching ? 'Загрузка' : 'Загрузить еще'}
                                </Text>
                            </Button>
                        )}
                    </Flex>
                </Box>
                <RelevantKitchenSection />
            </Layout>
        </>
    );
};
