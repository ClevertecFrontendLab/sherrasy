import { Box, Heading } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useParams } from 'react-router';

import { ContentHeader } from '~/components/content-header/content-header';
import { Layout } from '~/components/layout/layout';
import { RecipesTabs } from '~/components/recipes-tabs/recipes-tabs';
import { RelevantKitchenSection } from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { withCatSubValidation } from '~/hoc/withCatSubValidation';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';
import { getRecipes } from '~/store/recipes/selectors';
import { Category } from '~/types/category.type';
import { PathParams } from '~/types/params.type';
import { getRandomElement, getTabNames } from '~/utils/helpers';

const VeganPageComponent = () => {
    const { categoryId } = useParams<PathParams>();
    const { data: dataCategories = [], isError } = useGetCategoriesQuery();
    const backupCategories = useAppSelector(getCategories);
    const categories = isError ? backupCategories : dataCategories;
    const currentCategory = useMemo(
        () => getRandomElement<Category>(categories, categoryId),
        [categories, categoryId],
    );
    const rkRecipes = useAppSelector(getRecipes);
    if (!categories) {
        return <></>;
    }
    const tabsNames = getTabNames(categories, categoryId);
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
                <RelevantKitchenSection categoryInfo={currentCategory} />
            </Layout>
        </>
    );
};
export const VeganPage = withCatSubValidation(VeganPageComponent);
