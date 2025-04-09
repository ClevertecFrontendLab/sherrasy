import { Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';

import { RecipeWithImage } from '~/types/recipe.interface';

import RecipeCard from '../cards/recipe-card';

type RecipesListProps = {
    recipes: RecipeWithImage[];
};

function RecipesList({ recipes }: RecipesListProps) {
    return (
        <Flex direction='column' gap={{ base: 3, lg: 6 }} justify='center'>
            <SimpleGrid
                spacing={{ base: 4 }}
                templateColumns={{
                    base: 'repeat(auto-fill, minmax(20.375rem, 1fr))',
                    lg: 'repeat(auto-fill, minmax(41.75rem, 1fr))',
                }}
                overflowX='hidden'
            >
                {recipes.map((item: RecipeWithImage) => (
                    <RecipeCard key={item.id} recipe={item} type='horizontal' />
                ))}
            </SimpleGrid>
            <Button
                bg='lime.400'
                mt={{ base: 1 }}
                size={{ base: 'md', '2xl': 'lg' }}
                alignSelf='center'
            >
                <Text
                    fontWeight={600}
                    fontSize={{ base: 'md', '2xl': 'lg' }}
                    lineHeight={{ base: 6, '2xl': 7 }}
                >
                    Загрузить еще
                </Text>
            </Button>
        </Flex>
    );
}
export default RecipesList;
