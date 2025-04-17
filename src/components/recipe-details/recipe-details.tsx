import { Flex } from '@chakra-ui/react';

import { Ingredient, NutritionValue } from '~/types/recipe.interface';

import IngredientsTable from '../ingredients-table/ingredients-table';
import NutritionDetails from '../nutrition-details/nutrition-details';

type RecipeDetailsProps = {
    portions: number;
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
};

function RecipeDetails({ portions, nutritionValue, ingredients }: RecipeDetailsProps) {
    return (
        <Flex
            direction='column'
            mt='1.375rem'
            pl={{ base: 4, sm: 5, lg: '17.75rem' }}
            pr={{ base: 4, sm: 5, lg: '17.375rem' }}
            align={{ base: 'start', sm: 'center' }}
            w='100%'
        >
            <NutritionDetails nutritionValue={nutritionValue} />
            <IngredientsTable portions={portions} ingredients={ingredients} />
        </Flex>
    );
}

export default RecipeDetails;
