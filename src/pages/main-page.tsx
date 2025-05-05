import { Box, Heading } from '@chakra-ui/react';

import { ContentHeader } from '~/components/content-header/content-header';
import { CookBlogSection } from '~/components/cook-blog-section/cook-blog-section';
import { JuicySection } from '~/components/juicy-section/juicy-section';
import { Layout } from '~/components/layout/layout';
import { NewSection } from '~/components/new-section/new-section';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { RelevantKitchenSection } from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';
import { getFilteredRecipes, getIsFilteringRecipes } from '~/store/recipes/selectors';
import { Category } from '~/types/category.type';
import { getRandomElement } from '~/utils/helpers';

export const MainPage = () => {
    const isFiltering = useAppSelector(getIsFilteringRecipes);
    const recipes = useAppSelector(getFilteredRecipes);
    const { data: dataCategories = [], isError } = useGetCategoriesQuery();
    const backupCategories = useAppSelector(getCategories);
    const categories = isError ? backupCategories : dataCategories;
    const currentCategory = getRandomElement<Category>(categories);
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
                        <RecipesList recipes={recipes} isLastPage={true} />
                    </Box>
                ) : (
                    <Box alignSelf='start'>
                        <NewSection isRecipePage={false} />
                        <JuicySection />
                        <CookBlogSection />
                    </Box>
                )}{' '}
                <RelevantKitchenSection categoryInfo={currentCategory} />
            </Layout>
        </>
    );
};
