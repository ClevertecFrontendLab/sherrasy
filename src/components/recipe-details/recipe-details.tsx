import { Flex } from '@chakra-ui/react';

import { Ingredient, NutritionValue } from '~/types/recipe.interface';

import IngredientsTable from '../ingredients-table/ingredients-table';
import NutritionDetails from '../nutrition-details/nutrition-details';

type RecipeDetailsProps = {
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
};

function RecipeDetails({ nutritionValue, ingredients }: RecipeDetailsProps) {
    return (
        <Flex direction='column'>
            <NutritionDetails nutritionValue={nutritionValue} />
            <IngredientsTable ingredients={ingredients} />
        </Flex>
    );
}

export default RecipeDetails;
