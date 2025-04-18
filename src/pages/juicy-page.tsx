import { Box } from '@chakra-ui/react';

import { juicyListLong } from '~/components/cards/mock-cards.json';
import ContentHeader from '~/components/content-header/content-header';
import Layout from '~/components/layout/layout';
import RecipesList from '~/components/recipes-list/recipes-list';
import RelevantKitchenSection from '~/components/relevant-kitchen-section/relevant-kitchen-section';

function JuicyPage() {
    return (
        <>
            <Layout>
                <ContentHeader headline='Самое сочное' />
                <Box
                    mt={{ base: 8, sm: 4, lg: 3 }}
                    pl={{ base: 4, sm: 5, lg: '17.75rem' }}
                    pr={{ base: 0, sm: 5, lg: '17.375rem' }}
                >
                    <RecipesList recipes={juicyListLong} />
                </Box>
                <RelevantKitchenSection />
            </Layout>
        </>
    );
}
export default JuicyPage;
