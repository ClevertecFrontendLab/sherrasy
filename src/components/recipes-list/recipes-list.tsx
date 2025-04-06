import { Button, Flex, SimpleGrid } from '@chakra-ui/react';

import { RecipeWithImage } from '~/types/recipe.interface';

import RecipeCard from '../cards/recipe-card';

type RecipesListProps = {
    recipes: RecipeWithImage[];
};

function RecipesList({ recipes }: RecipesListProps) {
    return (
        <Flex p='1.5rem' mt='2.5rem' direction='column' justify='center'>
            <SimpleGrid
                spacing={4}
                templateColumns='repeat(auto-fill, minmax(41.75rem, 1fr))'
                mb='2.5rem'
            >
                {recipes.map((item: RecipeWithImage) => (
                    <RecipeCard key={item.id} recipe={item} type='horizontal' />
                ))}
            </SimpleGrid>
            <Button maxW='min-content' bg='lime.400' alignSelf='center'>
                Загрузить еще
            </Button>
        </Flex>
    );
}
export default RecipesList;
