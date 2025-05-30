import { Flex, Text } from '@chakra-ui/react';

import { NutritionValue } from '~/types/recipe.interface';
import { NutritionToName } from '~/utils/constant';

import { NutritionCard } from '../cards/nutrition-card';

type NutritionDetailsProps = {
    nutritionValue: NutritionValue;
};

export const NutritionDetails = ({ nutritionValue }: NutritionDetailsProps) => {
    const nutrition = Object.entries(nutritionValue).map(([key, val]) => ({
        key,
        val,
        name: NutritionToName[key],
    }));
    return (
        <Flex
            direction='column'
            w='100%'
            mt={0.5}
            align='center'
            maxW={{ lg: '36.125rem', xl: '41.75rem' }}
        >
            <Text fontSize='sm' lineHeight={5} ml={{ base: 0.5, lg: 0 }} alignSelf='start'>
                * Калорийность на 1 порцию
            </Text>
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                mt={{ base: 3, sm: 5, lg: '1.125rem' }}
                gap={{ base: 2.5, lg: 3, xl: 6 }}
            >
                {nutrition.map(({ key, name, val }) => (
                    <NutritionCard key={key} name={name} amount={val} />
                ))}
            </Flex>
        </Flex>
    );
};
