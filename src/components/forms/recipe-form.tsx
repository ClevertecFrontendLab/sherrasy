import { Button, Center, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { EditIcon } from '~/assets/icons/icons';
import { useDirtyRedirectBlocker } from '~/hooks/useDirtyRedirectBlocker';
import { useRecipeFormHandler } from '~/hooks/useRecipeFormHandler';
import { useUniversalModal } from '~/hooks/useUniversalModal';
import {
    useCreateRecipeMutation,
    useSaveDraftRecipeMutation,
    useUpdateRecipeMutation,
} from '~/query/services/recipes';
import { FullRecipe } from '~/types/recipe.interface';
import { AppRoute } from '~/utils/constant';
import { TestIdName } from '~/utils/testId-name.enum';

import { DraftModalBody } from '../modal/modal-body/draft-modal-body';
import { UniversalModal } from '../modal/universal-modal';
import { RecipeFormIngredients } from './recipe-form-parts/recipe-form-ingredients';
import { RecipeFormMain } from './recipe-form-parts/recipe-form-main';
import { RecipeFormSteps } from './recipe-form-parts/recipe-form-steps';
import { draftRecipeSchema, RecipeFormData, recipeSchema } from './validation-scheme/recipe.scheme';

type RecipeFormProps = {
    type: 'create' | 'edit';
    recipe?: FullRecipe;
};

const DEFAULT_FORMDATA = {
    title: '',
    description: '',
    portions: undefined,
    time: undefined,
    image: '',
    categoriesIds: [],
    ingredients: [{ title: '', count: undefined, measureUnit: '' }],
    steps: [{ stepNumber: 1, description: '', image: '' }],
};

export const RecipeForm = ({ recipe, type }: RecipeFormProps) => {
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const [createRecipe, { isSuccess: isCreated }] = useCreateRecipeMutation();
    const [saveDraft, { isSuccess: isSaved }] = useSaveDraftRecipeMutation();
    const [editRecipe, { isSuccess: isEdited }] = useUpdateRecipeMutation();
    const navigate = useNavigate();
    const recipeId = recipe ? recipe._id : '';
    const formMethods = useForm<RecipeFormData>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: false,
        defaultValues: DEFAULT_FORMDATA,
    });
    const {
        reset: resetForm,
        formState: { isDirty },
    } = formMethods;
    const { handlePublish, handleDraft } = useRecipeFormHandler(formMethods, {
        draft: draftRecipeSchema,
        publish: recipeSchema,
    });
    const { modalVisible, confirmExitPage, cancelPageLeave, markAsSaved } =
        useDirtyRedirectBlocker(isDirty);

    const handleSubmitPublish = async (data: RecipeFormData) => {
        if (type === 'edit') await editRecipe({ id: recipeId, body: data });
        if (type === 'create') await createRecipe(data);
    };

    const handleBlockedNavigation = () => openModal('exitRecipe');

    const handleClose = () => {
        closeModal();
        cancelPageLeave();
    };

    const handleConfirmExit = () => {
        closeModal();
        markAsSaved();
        resetForm();
    };

    const handleSubmitDraft = async (data: RecipeFormData) => {
        await saveDraft(data);
    };

    useEffect(() => {
        if (modalVisible) handleBlockedNavigation();
    }, [modalVisible]);

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

    useEffect(() => {
        if (isSaved) {
            navigate(AppRoute.Main);
            confirmExitPage();
        }
    }, [isCreated, isEdited, isSaved]);

    return (
        <>
            <Center
                flexDirection='column'
                as='form'
                w='100%'
                data-test-id={TestIdName.RecipeForm}
                gap={{ base: 8, lg: 10 }}
                px={4}
            >
                <RecipeFormMain formMethods={formMethods} />
                <VStack w={{ base: '100%', sm: '604px', lg: '658px' }} alignItems='start'>
                    <RecipeFormIngredients formMethods={formMethods} />
                    <RecipeFormSteps formMethods={formMethods} />
                </VStack>
                <Center w='100%' flexDirection={{ base: 'column', sm: 'row' }} gap={5}>
                    <Button
                        variant='outline'
                        colorScheme='black'
                        w='100%'
                        size='lg'
                        maxW={{ sm: '15.375rem' }}
                        onClick={handleDraft(handleSubmitDraft)}
                        data-test-id={TestIdName.RecipeSaveDraftButton}
                    >
                        <EditIcon mr={2} />
                        Сохранить черновик
                    </Button>
                    <Button
                        colorScheme='black'
                        w='100%'
                        size='lg'
                        maxW={{ sm: '15.375rem' }}
                        onClick={handlePublish(handleSubmitPublish)}
                        data-test-id={TestIdName.RecipePublishButton}
                    >
                        Опубликовать рецепт
                    </Button>
                </Center>
            </Center>
            <UniversalModal
                isOpen={isOpen}
                onClose={handleClose}
                config={config}
                testId={TestIdName.PreventiveModal}
            >
                <DraftModalBody
                    handleExit={handleConfirmExit}
                    handleSaveDraft={handleDraft(handleSubmitDraft)}
                />
            </UniversalModal>
        </>
    );
};
