import { Flex } from '@chakra-ui/react';

import { Ingredient, NutritionValue } from '~/types/recipe.interface';

import { IngredientsTable } from '../ingredients-table/ingredients-table';
import { NutritionDetails } from '../nutrition-details/nutrition-details';

type RecipeDetailsProps = {
    portions: number;
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
};

export const RecipeDetails = ({ portions, nutritionValue, ingredients }: RecipeDetailsProps) => (
    <Flex
        direction='column'
        mt={{ base: '1.375rem', lg: 10 }}
        pl={{ base: 4, sm: 5 }}
        pr={{ base: 4, sm: 5 }}
        align={{ base: 'start', sm: 'center' }}
        w='100%'
    >
        <NutritionDetails nutritionValue={nutritionValue} />
        <IngredientsTable portions={portions} ingredients={ingredients} />
    </Flex>
);
