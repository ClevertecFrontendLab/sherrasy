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
        <Flex direction='column' w='100%' mt={0.5}>
            <Text fontSize='sm' lineHeight={5} ml={0.5}>
                * Калорийность на 1 порцию
            </Text>
            <Flex direction={{ base: 'column', sm: 'row' }} mt={3} gap={3}>
                {nutrition.map(({ key, name, val }) => (
                    <NutritionCard key={key} name={name} amount={val} />
                ))}
            </Flex>
        </Flex>
    );
}

export default NutritionDetails;
