import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { AddItemIcon } from '~/assets/icons/icons';
import { StepCardForm } from '~/components/cards/step-card';

import { RecipeFormData } from '../validation-scheme/recipe.scheme';

export const RecipeFormSteps = ({
    formMethods,
}: {
    formMethods: UseFormReturn<RecipeFormData>;
}) => {
    const { control, setValue } = formMethods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps',
    });

    const handleAddStep = () => {
        append({
            stepNumber: fields.length + 1,
            description: '',
            image: '',
        });
    };

    const handleRemoveStep = (index: number) => {
        remove(index);
        const updatedFields = fields.filter((_, i) => i !== index);
        updatedFields.forEach((_, i) => {
            if (i >= index) {
                setValue(`steps.${i}.stepNumber`, i + 1);
            }
        });
    };

    return (
        <VStack alignItems='start' w='100%'>
            <HStack
                alignItems='center'
                mb={2}
                fontSize={{ base: 'sm', lg: 'md' }}
                lineHeight={{ base: 5, lg: 6 }}
                fontWeight='semibold'
            >
                <Text> Добавить шаги приготовления</Text>
            </HStack>
            {fields.map((field, index) => (
                <StepCardForm
                    key={field.id}
                    index={index}
                    formMethods={formMethods}
                    fields={fields}
                    onRemove={() => handleRemoveStep(index)}
                />
            ))}
            <Button
                size='sm'
                onClick={handleAddStep}
                rightIcon={<AddItemIcon />}
                variant='outline'
                alignSelf='end'
                mt={2}
            >
                Новый шаг
            </Button>
        </VStack>
    );
};
