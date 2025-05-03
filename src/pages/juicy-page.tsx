import { Box, Heading } from '@chakra-ui/react';

import { ContentHeader } from '~/components/content-header/content-header';
import { Layout } from '~/components/layout/layout';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { RelevantKitchenSection } from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';
import { getFilteredRecipes } from '~/store/recipes/selectors';
import { Category } from '~/types/category.type';
import { getRandomElement, getSortedJuicyRecipes } from '~/utils/helpers';

function JuicyPage() {
    const recipes = useAppSelector(getFilteredRecipes);
    const { data: dataCategories = [], isError } = useGetCategoriesQuery();
    const backupCategories = useAppSelector(getCategories);
    const categories = isError ? backupCategories : dataCategories;
    const currentCategory = getRandomElement<Category>(categories);
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
                <RelevantKitchenSection categoryInfo={currentCategory} />
            </Layout>
        </>
    );
}
export default JuicyPage;
