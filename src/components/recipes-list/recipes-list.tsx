import { Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';

import { RecipeWithImage } from '~/types/recipe.interface';

import RecipeCard from '../cards/recipe-card';

type RecipesListProps = {
    recipes: RecipeWithImage[];
};

function RecipesList({ recipes }: RecipesListProps) {
    return (
        <Flex direction='column' gap={{ base: 3, lg: 3.5 }} justify='center'>
            <SimpleGrid
                spacing={{ base: 4, '2xl': 5 }}
                spacingY={{ '2xl': 4 }}
                templateColumns={{
                    base: 'repeat(auto-fill, minmax(20.375rem, 1fr))',
                    lg: 'repeat(auto-fill, minmax(41.75rem, 1fr))',
                }}
            >
                {recipes.map((item: RecipeWithImage) => (
                    <RecipeCard key={item.id} recipe={item} type='horizontal' />
                ))}
            </SimpleGrid>
            <Button bg='lime.400' mt={1} size='md' alignSelf='center'>
                <Text fontWeight={600} fontSize='md' lineHeight={6}>
                    Загрузить еще
                </Text>
            </Button>
        </Flex>
    );
}
export default RecipesList;
