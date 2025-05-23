import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

import { ContentHeader } from '~/components/content-header/content-header';
import { CookBlogSection } from '~/components/cook-blog-section/cook-blog-section';
import { JuicySection } from '~/components/juicy-section/juicy-section';
import { Layout } from '~/components/layout/layout';
import { NewSection } from '~/components/new-section/new-section';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { RelevantKitchenSection } from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { useLazyGetRecipesQuery } from '~/query/services/recipes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { clearFilteringParams } from '~/store/recipes/recipes-slice';
import { getIsFilteringRecipes, getRecipeQuery } from '~/store/recipes/selectors';

export const MainPage = () => {
    const isFiltering = useAppSelector(getIsFilteringRecipes);
    const [triggerRecipes, { data: recipes = [] }] = useLazyGetRecipesQuery();
    const dispatch = useAppDispatch();
    const query = useAppSelector(getRecipeQuery);

    const handleFilterRecipes = async () => await triggerRecipes(query);

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
                        <RecipesList recipes={recipes} />
                    </Box>
                ) : (
                    <Box alignSelf='start'>
                        <NewSection />
                        <JuicySection />
                        <CookBlogSection />
                    </Box>
                )}{' '}
                <RelevantKitchenSection />
            </Layout>
        </>
    );
};
