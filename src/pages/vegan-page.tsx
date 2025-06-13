import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { ContentHeader } from '~/components/content-header/content-header';
import { Layout } from '~/components/layout/page-layout/layout';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { RelevantKitchenSection } from '~/components/sections/relevant-kitchen-section/relevant-kitchen-section';
import { RecipesTabs } from '~/components/tabs/recipes-tabs';
import { withCatSubValidation } from '~/hoc/withCatSubValidation';
import { useLazyGetRecipesQuery } from '~/query/services/recipes';
import { getCategories } from '~/store/categories/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { clearFilteringParams } from '~/store/recipes/recipes-slice';
import { getIsFilteringRecipes, getRecipeQuery } from '~/store/recipes/selectors';
import { PathParams } from '~/types/params.type';
import { getTabNames } from '~/utils/helpers/categories-helpers';

const VeganPageComponent = () => {
    const { categoryId } = useParams<PathParams>();
    const categories = useAppSelector(getCategories);
    const categoryInfo = categories.find((cat) => cat.category === categoryId);
    const isFiltering = useAppSelector(getIsFilteringRecipes);
    const [triggerRecipes, { data: recipes = [] }] = useLazyGetRecipesQuery();
    const dispatch = useAppDispatch();
    const tabsNames = getTabNames(categories, categoryId);
    const subcategoriesIds = tabsNames.map((item) => item._id).join(',');
    const query = useAppSelector(getRecipeQuery);

    useEffect(
        () => () => {
            dispatch(clearFilteringParams());
        },
        [dispatch],
    );

    const handleFilterRecipes = async () => await triggerRecipes({ ...query, subcategoriesIds });

    const contentData = {
        headline: categoryInfo?.title ?? '',
        description: categoryInfo?.description,
    };
    return (
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
                    <RecipesList recipes={recipes} />
                </Box>
            ) : (
                <Box pl={{ base: 4, sm: 5 }} pr={{ base: 0, sm: 5 }} w='100%' alignSelf='start'>
                    <RecipesTabs tabsNames={tabsNames} />
                </Box>
            )}
            <RelevantKitchenSection />
        </Layout>
    );
};
export const VeganPage = withCatSubValidation(VeganPageComponent);
