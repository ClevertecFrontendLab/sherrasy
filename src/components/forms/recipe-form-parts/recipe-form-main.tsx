import { Stack, VStack } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

import { ImagePreview } from '~/components/image-preview/image-preview';
import { FormInput } from '~/components/inputs/form-input/form-input';
import { FormNumberInput } from '~/components/inputs/form-input/form-number-input';
import { FormTextarea } from '~/components/inputs/form-textarea/form-textarea';
import { SubcategoriesMultiSelect } from '~/components/multiselect/subcategories-multiselect';
import { TestIdName } from '~/utils/testId-name.enum';

import { RecipeFormData } from '../validation-scheme/recipe.scheme';

export const RecipeFormMain = ({ formMethods }: { formMethods: UseFormReturn<RecipeFormData> }) => {
    const testIds = {
        block: `${TestIdName.RecipeImageBlock}`,
        input: `${TestIdName.RecipeImageBlockInputFile}`,
        preview: `${TestIdName.RecipeImageBlockPreviewImage}`,
    };
    return (
        <Stack
            mt={{ base: 4, lg: '3.5rem' }}
            gap={{ base: 4, lg: 6 }}
            flexDirection={{ base: 'column', sm: 'row' }}
            w='100%'
        >
            <ImagePreview<RecipeFormData>
                name='image'
                formMethods={formMethods}
                testIds={testIds}
            />
            <VStack w='100%'>
                <SubcategoriesMultiSelect<RecipeFormData>
                    name='categoriesIds'
                    formMethods={formMethods}
                />
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
};
