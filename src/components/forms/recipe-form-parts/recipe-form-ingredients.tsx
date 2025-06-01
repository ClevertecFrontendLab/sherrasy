import { HStack, Text, VStack } from '@chakra-ui/react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { OutlinedAddItemIcon } from '~/assets/icons/icons';
import { RecipeIngredientRow } from '~/components/recipe-ingredient-row/recipe-ingredient-row';
import { useGetMeasureUnitsQuery } from '~/query/services/measure-units';

import { RecipeFormData } from '../validation-scheme/recipe.scheme';

export const RecipeFormIngredients = ({
    formMethods,
}: {
    formMethods: UseFormReturn<RecipeFormData>;
}) => {
    const { data: measureUnits } = useGetMeasureUnitsQuery();
    const { control } = formMethods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });
    return (
        <VStack alignItems='start'>
            <HStack
                alignItems='center'
                mb={4}
                fontSize={{ base: 'sm', lg: 'md' }}
                lineHeight={{ base: 5, lg: 6 }}
                fontWeight='semibold'
            >
                <Text>Добавьте ингредиенты рецепта, нажав на</Text>
                <OutlinedAddItemIcon />
            </HStack>
            {fields.map((field, index) => (
                <RecipeIngredientRow
                    key={field.id}
                    index={index}
                    formMethods={formMethods}
                    measureUnits={measureUnits}
                    onRemove={() => remove(index)}
                    isLast={index === fields.length - 1}
                    onAdd={() => append({ title: '', count: 0, measureUnit: '' })}
                />
            ))}
        </VStack>
    );
};
