import { Box, Heading } from '@chakra-ui/react';

import ContentHeader from '~/components/content-header/content-header';
import CookBlogSection from '~/components/cook-blog-section/cook-blog-section';
import JuicySection from '~/components/juicy-section/juicy-section';
import Layout from '~/components/layout/layout';
import NewSection from '~/components/new-section/new-section';
import RecipesList from '~/components/recipes-list/recipes-list';
import RelevantKitchenSection from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { useAppSelector } from '~/store/hooks';
import { getFilteredRecipes, getIsFilteringRecipes, getRecipes } from '~/store/recipes/selectors';

function MainPage() {
    const isFiltering = useAppSelector(getIsFilteringRecipes);
    const recipes = useAppSelector((state) => getFilteredRecipes(state, 'active'));
    const rkRecipes = useAppSelector(getRecipes) ?? [];
    if (!recipes) {
        return <Heading>An error occured</Heading>;
    }
    return (
        <>
            <Layout>
                <ContentHeader headline='Приятного аппетита!' />
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
                        <JuicySection recipes={recipes} />
                        <CookBlogSection />
                    </Box>
                )}{' '}
                <RelevantKitchenSection recipes={rkRecipes} />
            </Layout>
        </>
    );
}
export default MainPage;
