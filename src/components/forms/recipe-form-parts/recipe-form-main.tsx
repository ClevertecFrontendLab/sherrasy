import { Stack, VStack } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

import { ImagePreview } from '~/components/image-preview/image-preview';
import { FormInput } from '~/components/inputs/form-input/form-input';
import { FormNumberInput } from '~/components/inputs/form-input/form-number-input';
import { FormTextarea } from '~/components/inputs/form-textarea/form-textarea';
import { TestIdName } from '~/utils/testId-name.enum';

import { RecipeFormData } from '../validation-scheme/recipe.scheme';

export const RecipeFormMain = ({ formMethods }: { formMethods: UseFormReturn<RecipeFormData> }) => (
    <Stack
        mt={{ base: 4, lg: '3.5rem' }}
        gap={{ base: 4, lg: 6 }}
        flexDirection={{ base: 'column', sm: 'row' }}
        w='100%'
    >
        <ImagePreview<RecipeFormData>
            name='image'
            testId={TestIdName.RecipeTitle}
            formMethods={formMethods}
        />
        <VStack w='100%'>
            <FormInput<RecipeFormData>
                name='title'
                testId={TestIdName.RecipeTitle}
                formMethods={formMethods}
            />
            <FormTextarea<RecipeFormData>
                name='description'
                testId={TestIdName.RecipeDescription}
                formMethods={formMethods}
            />
            <FormNumberInput<RecipeFormData>
                name='portions'
                testId={TestIdName.RecipePortions}
                formMethods={formMethods}
            />
            <FormNumberInput<RecipeFormData>
                name='time'
                testId={TestIdName.RecipeTime}
                formMethods={formMethods}
            />
        </VStack>
    </Stack>
);
