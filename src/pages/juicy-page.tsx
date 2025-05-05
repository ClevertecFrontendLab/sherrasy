import { Box } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { ContentHeader } from '~/components/content-header/content-header';
import { Layout } from '~/components/layout/layout';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { RelevantKitchenSection } from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { Tags } from '~/query/constants/tags';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { recipesApiSlice, useGetJuiciestRecipesQuery } from '~/query/services/recipes';
import { getCategories } from '~/store/categories/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Category } from '~/types/category.type';
import { getRandomElement } from '~/utils/helpers';

export const JuicyPage = () => {
    const { data: dataCategories = [], isError: isCatError } = useGetCategoriesQuery();
    const backupCategories = useAppSelector(getCategories);
    const categories = isCatError ? backupCategories : dataCategories;
    const currentCategory = useMemo(() => getRandomElement<Category>(categories), [categories]);
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(1);
    const limit = 8;

    const queryArgs = useMemo(() => ({ limit, page }), [limit, page]);
    const {
        data: recipesData,
        isFetching,
        isLoading,
    } = useGetJuiciestRecipesQuery(queryArgs, {
        refetchOnMountOrArgChange: true,
    });

    const isLastPage = Boolean(
        recipesData?.meta && recipesData.meta.page === recipesData.meta.totalPages,
    );

    const loadRecipes = async () => {
        if (!isFetching && !isLoading && !isLastPage) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(
        () => () => {
            setPage(1);
            dispatch(recipesApiSlice.util.invalidateTags([Tags.JUICY_RECIPES]));
        },
        [dispatch],
    );

    return (
        <>
            <Layout>
                <ContentHeader headline='Самое сочное' />
                <Box
                    mt={{ base: 8, sm: 4, lg: 3 }}
                    pl={{ base: 4, sm: 5, lg: '17.75rem' }}
                    pr={{ base: 0, sm: 5, lg: '17.375rem' }}
                    alignSelf='start'
                    width='100%'
                >
                    <RecipesList
                        recipes={recipesData?.data ?? []}
                        isLastPage={isLastPage}
                        handleLoadMore={loadRecipes}
                    />
                </Box>
                <RelevantKitchenSection categoryInfo={currentCategory} />
            </Layout>
        </>
    );
};
