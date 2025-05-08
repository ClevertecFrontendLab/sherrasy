import { Box, useToast } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';

import { showAlertToast } from '~/components/alert-error/show-alert';
import { ContentHeader } from '~/components/content-header/content-header';
import { Layout } from '~/components/layout/layout';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { RecipesTabs } from '~/components/recipes-tabs/recipes-tabs';
import { RelevantKitchenSection } from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { withCatSubValidation } from '~/hoc/withCatSubValidation';
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
import { PathParams } from '~/types/params.type';
import { getRandomElement, getRecipeQueryString, getTabNames } from '~/utils/helpers';

const VeganPageComponent = () => {
    const { categoryId } = useParams<PathParams>();
    const { data: dataCategories = [], isError } = useGetCategoriesQuery();
    const backupCategories = useAppSelector(getCategories);
    const categories = isError ? backupCategories : dataCategories;
    const categoryInfo = categories.find((cat) => cat.category === categoryId);
    const isFiltering = useAppSelector(getIsFilteringRecipes);
    const [triggerRecipes, { data: recipes = [] }] = useLazyGetRecipesQuery();
    const toast = useToast();
    const dispatch = useAppDispatch();
    const tabsNames = getTabNames(categories, categoryId);
    const subcategoriesIds = tabsNames.map((item) => item._id).join(',');
    const query = useAppSelector(getRecipeQuery);
    const currentCategory = useMemo(
        () => getRandomElement<Category>(categories, categoryId),
        [categories, categoryId],
    );

    useEffect(
        () => () => {
            dispatch(clearFilteringParams());
        },
        [dispatch],
    );

    const handleFilterRecipes = async () => {
        const queryString = getRecipeQueryString({ ...query, subcategoriesIds });
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

    const contentData = {
        headline: categoryInfo?.title ?? '',
        description: categoryInfo?.description,
    };
    return (
        <>
            <Layout>
                <ContentHeader
                    headline={contentData.headline}
                    description={contentData.description}
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
                    <Box
                        pl={{ base: 4, sm: 5, lg: '17.75rem' }}
                        pr={{ base: 0, sm: 5, lg: '17.375rem' }}
                        w='100%'
                        alignSelf='start'
                    >
                        <RecipesTabs tabsNames={tabsNames} />
                    </Box>
                )}
                <RelevantKitchenSection categoryInfo={currentCategory} />
            </Layout>
        </>
    );
};
export const VeganPage = withCatSubValidation(VeganPageComponent);
