import { Box } from '@chakra-ui/react';

import ContentHeader from '~/components/content-header/content-header';
import Layout from '~/components/layout/layout';
import RecipesTabs from '~/components/recipes-tabs/recipes-tabs';
import RelevantKitchenSection from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { newMockData } from '~/utils/data/mock-cards.json';
import data from '~/utils/data/mock-dishes.json';
import { getTabNames } from '~/utils/helpers';

function VeganPage() {
    const tabsNames = getTabNames(data);
    const contentData = {
        headline: 'Веганская кухня',
        description:
            ' Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.',
    };
    return (
        <>
            <Layout>
                <ContentHeader
                    headline={contentData.headline}
                    description={contentData.description}
                />
                <Box
                    pl={{ base: 4, sm: 5, lg: '17.75rem' }}
                    pr={{ base: 0, sm: 5, lg: '17.375rem' }}
                >
                    <RecipesTabs tabsNames={tabsNames} recipes={newMockData} />
                </Box>
                <RelevantKitchenSection />
            </Layout>
        </>
    );
}
export default VeganPage;
