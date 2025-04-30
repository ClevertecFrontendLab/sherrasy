import { Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';

import { FullRecipe } from '~/types/recipe.interface';

import { RecipeCard } from '../cards/recipe-cards/recipe-card';

type RecipesListProps = {
    recipes: FullRecipe[] | null;
};

export const RecipesList = ({ recipes }: RecipesListProps) => {
    if (!recipes || recipes.length === 0) {
        return <Text> Элементы с такими данными не найдены</Text>;
    }
    return (
        <Flex direction='column' gap={{ base: 3, sm: 3.5 }} justify='center'>
            <SimpleGrid
                spacing={{ base: '13px', xs: 4, sm: 3.5, lg: 4, '2xl': '24px' }}
                spacingY={{ '2xl': 4 }}
                templateColumns={{
                    base: 'repeat(auto-fill, minmax(20.375rem, 1fr))',
                    lg: 'repeat(1, minmax(41.75rem, 1fr))',
                    xl: 'repeat(2, minmax(41.75rem, 1fr))',
                }}
            >
                {recipes.map((item: FullRecipe, i: number) => (
                    <RecipeCard
                        recipe={item}
                        type='horizontal'
                        key={item.id}
                        testI={`food-card-${i}`}
                    />
                ))}
            </SimpleGrid>
            {recipes.length >= 8 && (
                <Button
                    bg='lime.400'
                    mt={1}
                    size='md'
                    alignSelf='center'
                    data-test-id='load-more-button'
                >
                    <Text fontWeight={600} fontSize='md' lineHeight={6}>
                        Загрузить еще
                    </Text>
                </Button>
            )}
        </Flex>
    );
};
