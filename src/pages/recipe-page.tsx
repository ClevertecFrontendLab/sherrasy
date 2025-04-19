import { Box, Flex } from '@chakra-ui/react';

import { newMockData } from '~/components/cards/mock-cards.json';
import AuthorCard from '~/components/cards/user-cards/author-card';
import Layout from '~/components/layout/layout';
import NewSection from '~/components/new-section/new-section';
import RecipeDetails from '~/components/recipe-details/recipe-details';
import RecipeHeader from '~/components/recipe-header/recipe-header';
import RecipeSteps from '~/components/recipe-steps/recipe-steps';
import { FullRecipe } from '~/types/recipe.interface';

const MockAuthor = {
    id: 16,
    avatar: '/img/author-avatar.jpg',
    name: 'Сергей Разумов',
    nick: '@serge25',
    description: '',
    subscribers: 125,
};

function RecipePage() {
    const recipe: FullRecipe = newMockData[0];
    const { portions, nutritionValue, ingredients, steps } = recipe;
    return (
        <>
            <Layout>
                <Flex
                    direction='column'
                    justify='center'
                    align='center'
                    mt={{ base: 4, sm: '1.125rem', md: 4, lg: 14 }}
                >
                    <RecipeHeader recipe={recipe} />
                    <RecipeDetails
                        portions={portions}
                        nutritionValue={nutritionValue}
                        ingredients={ingredients}
                    />
                    <RecipeSteps steps={steps} />
                    <AuthorCard author={MockAuthor} />
                </Flex>
                <Box mt={{ base: 10, lg: '3.75rem' }}>
                    <NewSection />
                </Box>
            </Layout>
        </>
    );
}
export default RecipePage;
