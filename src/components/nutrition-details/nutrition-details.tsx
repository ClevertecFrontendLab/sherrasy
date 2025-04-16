import { Flex, Text } from '@chakra-ui/react';

import { NutritionValue } from '~/types/recipe.interface';
import { NutritionToName } from '~/utils/constant';

import NutritionCard from '../cards/nutrition-card';

type NutritionDetailsProps = {
    nutritionValue: NutritionValue;
};

function NutritionDetails({ nutritionValue }: NutritionDetailsProps) {
    const nutrition = Object.entries(nutritionValue).map(([key, val]) => ({
        key,
        val,
        name: NutritionToName[key],
    }));
    return (
        <Flex direction='column'>
            <Text textAlign='start'>* Калорийность на 1 порцию</Text>
            <Flex direction='row'>
                {nutrition.map(({ key, name, val }) => (
                    <NutritionCard key={key} name={name} amount={val} />
                ))}
            </Flex>
        </Flex>
    );
}

export default NutritionDetails;
