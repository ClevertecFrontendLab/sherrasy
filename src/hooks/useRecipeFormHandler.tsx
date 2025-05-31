import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
    draftRecipeSchema,
    RecipeFormData,
    recipeSchema,
} from '~/components/forms/validation-scheme/recipe.scheme';
import { ValidationMessage } from '~/utils/forms.constant';
import { transformEmptyStringsToNull } from '~/utils/helpers/transform-empty-strings-to-null';

export const useRecipeFormHandler = (
    formMethods: ReturnType<typeof useForm<RecipeFormData>>,
    schemas: {
        draft: typeof draftRecipeSchema;
        publish: typeof recipeSchema;
    },
) => {
    const { setError, clearErrors, getValues, trigger } = formMethods;

    const validateForm = async (isDraft: boolean) => {
        clearErrors();
        const schema = isDraft ? schemas.draft : schemas.publish;
        const values = getValues();

        try {
            await schema.validate(values, { abortEarly: false });
            return true;
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const newErrors = {} as Record<string, { type: string; message: string }>;

                err.inner.forEach((validationErr) => {
                    if (validationErr.path) {
                        newErrors[validationErr.path] = {
                            type: 'validation',
                            message: ValidationMessage.EmptyMessage,
                        };
                    }
                });

                Object.keys(newErrors).forEach((key) => {
                    setError(key as keyof RecipeFormData, newErrors[key]);
                });
            }
            return false;
        }
    };

    const handleFormSubmit = async (
        onSubmit: (data: RecipeFormData) => Promise<void>,
        isDraft: boolean,
    ) => {
        await trigger();

        const isValid = await validateForm(isDraft);

        if (!isValid) return;

        const values = getValues();
        const transformedData = transformEmptyStringsToNull(values);
        await onSubmit(transformedData);
    };

    return {
        handlePublish: (onSubmit: (data: RecipeFormData) => Promise<void>) => () =>
            handleFormSubmit(onSubmit, false),
        handleDraft: (onSubmit: (data: RecipeFormData) => Promise<void>) => () =>
            handleFormSubmit(onSubmit, true),
    };
};
