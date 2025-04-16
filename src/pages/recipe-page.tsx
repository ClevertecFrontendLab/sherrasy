import { Flex } from '@chakra-ui/react';

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
    avatar: '/img/avatar-3.png',
    name: 'Сергей Разумов',
    nick: '@serge25',
    description: '',
    subscribers: 125,
};

function RecipePage() {
    const recipe: FullRecipe = newMockData[0];
    const { nutritionValue, ingredients, steps } = recipe;
    return (
        <>
            <Layout>
                <Flex
                    direction='column'
                    justify='center'
                    align='center'
                    textAlign='center'
                    mt={{ base: 8, sm: '1.875rem', md: 8, lg: '2.5rem' }}
                    pl={{ base: 4, sm: 5, lg: '17.75rem' }}
                    pr={{ base: 0, sm: 5, lg: '17.375rem' }}
                >
                    <RecipeHeader recipe={recipe} />
                    <RecipeDetails nutritionValue={nutritionValue} ingredients={ingredients} />
                    <RecipeSteps steps={steps} />
                    <AuthorCard author={MockAuthor} />
                </Flex>
                <NewSection />
            </Layout>
        </>
    );
}
export default RecipePage;
