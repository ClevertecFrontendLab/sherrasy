import { SimpleGrid, Text } from '@chakra-ui/react';

import { FullRecipe } from '~/types/recipe.interface';

import { RecipeCard } from '../cards/recipe-cards/recipe-card';

type RecipesListProps = {
    recipes: FullRecipe[] | null;
    testId?: string;
};

export const RecipesList = ({ recipes, testId = '' }: RecipesListProps) => {
    if (!recipes || recipes.length === 0) {
        return <Text> Элементы с такими данными не найдены</Text>;
    }
    return (
        <SimpleGrid
            spacing={{ base: '13px', xs: 4, sm: 3.5, lg: 4, '2xl': '24px' }}
            spacingY={{ '2xl': 4 }}
            templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(1, 1fr)',
                xl: 'repeat(2, 1fr)',
            }}
            data-test-id={testId}
        >
            {recipes.map((item: FullRecipe, i: number) => (
                <RecipeCard
                    recipe={item}
                    type='horizontal'
                    key={`${item._id}-${i}`}
                    testI={`food-card-${i}`}
                />
            ))}
        </SimpleGrid>
    );
};
