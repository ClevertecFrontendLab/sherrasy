import { Box, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router';

import ContentHeader from '~/components/content-header/content-header';
import Layout from '~/components/layout/layout';
import RecipesTabs from '~/components/recipes-tabs/recipes-tabs';
import RelevantKitchenSection from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { useAppSelector } from '~/store/hooks';
import { getRecipes } from '~/store/recipes/selectors';
import { PathParams } from '~/types/params.type';
import data from '~/utils/data/mock-dishes.json';
import { getTabNames } from '~/utils/helpers';

function VeganPage() {
    const { categoryId } = useParams<PathParams>();
    const tabsNames = getTabNames(data, categoryId);
    const rkRecipes = useAppSelector(getRecipes);
    if (!rkRecipes) {
        return <Heading>An error occured</Heading>;
    }
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
                    w='100%'
                    alignSelf='start'
                >
                    <RecipesTabs tabsNames={tabsNames} />
                </Box>
                <RelevantKitchenSection recipes={rkRecipes} />
            </Layout>
        </>
    );
}
export default VeganPage;
