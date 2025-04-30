import { Box, Heading } from '@chakra-ui/react';

import { ContentHeader } from '~/components/content-header/content-header';
import { Layout } from '~/components/layout/layout';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { RelevantKitchenSection } from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { useAppSelector } from '~/store/hooks';
import { getFilteredRecipes, getRecipes } from '~/store/recipes/selectors';
import { getSortedJuicyRecipes } from '~/utils/helpers';

function JuicyPage() {
    const recipes = useAppSelector(getFilteredRecipes);
    const rkRecipes = useAppSelector(getRecipes) ?? [];
    if (!recipes) {
        return <Heading>An error occured</Heading>;
    }
    const currentRecipes = getSortedJuicyRecipes(recipes);

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
                    <RecipesList recipes={currentRecipes} />
                </Box>
                <RelevantKitchenSection recipes={rkRecipes} />
            </Layout>
        </>
    );
}
export default JuicyPage;
