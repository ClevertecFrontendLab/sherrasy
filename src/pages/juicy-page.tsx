import { Box, Heading } from '@chakra-ui/react';

import ContentHeader from '~/components/content-header/content-header';
import Layout from '~/components/layout/layout';
import RecipesList from '~/components/recipes-list/recipes-list';
import RelevantKitchenSection from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { useAppSelector } from '~/store/hooks';
import { getRecipes } from '~/store/recipes/selectors';

function JuicyPage() {
    const recipes = useAppSelector(getRecipes);
    if (!recipes) {
        return <Heading>An error occured</Heading>;
    }
    return (
        <>
            <Layout>
                <ContentHeader headline='Самое сочное' />
                <Box
                    mt={{ base: 8, sm: 4, lg: 3 }}
                    pl={{ base: 4, sm: 5, lg: '17.75rem' }}
                    pr={{ base: 0, sm: 5, lg: '17.375rem' }}
                >
                    <RecipesList recipes={recipes} />
                </Box>
                <RelevantKitchenSection recipes={recipes} />
            </Layout>
        </>
    );
}
export default JuicyPage;
