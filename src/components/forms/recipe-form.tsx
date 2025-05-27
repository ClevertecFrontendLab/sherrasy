import { Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useUniversalModal } from '~/hooks/useUniversalModal';
import { FullRecipe } from '~/types/recipe.interface';
import { TestIdName } from '~/utils/testId-name.enum';

import { FormInput } from '../inputs/form-input/form-input';
import { FormNumberInput } from '../inputs/form-input/form-number-input';
import { FormTextarea } from '../inputs/form-textarea/form-textarea';
import { DraftModalBody } from '../modal/draft-modal-body';
import { UniversalModal } from '../modal/universal-modal';
import { RecipeFormData, recipeSchema } from './validation-scheme/recipe.scheme';

type RecipeFormProps = {
    recipe?: FullRecipe;
};

export const RecipeForm = ({ recipe }: RecipeFormProps) => {
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const hasChanges = false;
    // const {data:measureUnits} = useGetMeasureUnitsQuery();

    const formMethods = useForm<RecipeFormData>({
        resolver: yupResolver(recipeSchema),
    });
    const { handleSubmit, reset: resetForm } = formMethods;

    const onSubmit = async (data: RecipeFormData) => {
        console.log(data);
    };
    const handleBlockedNavigation = () => openModal('exitRecipe');

    const handleClose = () => {
        closeModal();
    };

    const handleConfirmExit = () => {
        closeModal();
        resetForm();
    };

    useEffect(() => {
        if (hasChanges) handleBlockedNavigation();
    }, [hasChanges]);

    useEffect(() => {
        if (recipe) {
            const formData = {
                title: recipe.title,
                description: recipe.description,
                time: recipe.time,
                categoriesIds: recipe.categoriesIds,
                portions: recipe.portions,
                image: recipe.image,
                ingredients: recipe.ingredients.map((value) => ({ ...value, count: +value.count })),
                steps: recipe.steps,
            };
            resetForm(formData);
        }
    }, [recipe]);

    return (
        <>
            <Stack
                as='form'
                onSubmit={handleSubmit(onSubmit)}
                w='100%'
                data-test-id={TestIdName.RecipeForm}
            >
                <FormInput<RecipeFormData>
                    name='title'
                    testId={TestIdName.RecipeTitle}
                    formMethods={formMethods}
                    onSubmit={handleSubmit(onSubmit)}
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
            </Stack>
            <UniversalModal
                isOpen={isOpen}
                onClose={handleClose}
                config={config}
                testId={TestIdName.PreventiveModal}
            >
                <DraftModalBody handleExit={handleConfirmExit} />
            </UniversalModal>
        </>
    );
};
