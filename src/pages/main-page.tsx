import { Box, useToast } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';

import { showAlertToast } from '~/components/alert-error/show-alert';
import { ContentHeader } from '~/components/content-header/content-header';
import { CookBlogSection } from '~/components/cook-blog-section/cook-blog-section';
import { JuicySection } from '~/components/juicy-section/juicy-section';
import { Layout } from '~/components/layout/layout';
import { NewSection } from '~/components/new-section/new-section';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { RelevantKitchenSection } from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useLazyGetRecipesQuery } from '~/query/services/recipes';
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
import { getRandomElement, getRecipeQueryString } from '~/utils/helpers';

export const MainPage = () => {
    const isFiltering = useAppSelector(getIsFilteringRecipes);
    const [triggerRecipes, { data: recipes = [] }] = useLazyGetRecipesQuery();
    const toast = useToast();
    const dispatch = useAppDispatch();
    const query = useAppSelector(getRecipeQuery);
    const { data: dataCategories = [], isError } = useGetCategoriesQuery();
    const backupCategories = useAppSelector(getCategories);
    const categories = isError ? backupCategories : dataCategories;
    const currentCategory = useMemo(() => getRandomElement<Category>(categories), [categories]);

    const handleFilterRecipes = async () => {
        const queryString = getRecipeQueryString(query);
        const result = await triggerRecipes(queryString);

        if (result.error) {
            showAlertToast('search', toast);
            dispatch(updateIsLoadingRecipe(false));
            dispatch(updateIsLoadingList(false));
            return;
        }

        if (result.data) {
            dispatch(updateIsFiltering());
            dispatch(updateHasRecipes((result.data.length > 0).toString()));
            dispatch(updateIsLoadingRecipe(false));
            dispatch(updateIsLoadingList(false));
        }
    };

    useEffect(
        () => () => {
            dispatch(clearFilteringParams());
        },
        [dispatch],
    );

    return (
        <>
            <Layout>
                <ContentHeader
                    headline='Приятного аппетита!'
                    handleFilterRecipes={handleFilterRecipes}
                />
                {isFiltering ? (
                    <Box
                        mt={{ base: 8, sm: 4, lg: 3 }}
                        px={{ base: 4, lg: 0 }}
                        w={{ base: '100%', lg: 'auto' }}
                        alignSelf='center'
                    >
                        <RecipesList recipes={recipes} isLastPage={true} />
                    </Box>
                ) : (
                    <Box alignSelf='start'>
                        <NewSection isRecipePage={false} />
                        <JuicySection />
                        <CookBlogSection />
                    </Box>
                )}{' '}
                <RelevantKitchenSection categoryInfo={currentCategory} />
            </Layout>
        </>
    );
};
