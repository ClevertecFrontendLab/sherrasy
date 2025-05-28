import { Button, Center, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { EditIcon } from '~/assets/icons/icons';
import { useUniversalModal } from '~/hooks/useUniversalModal';
import { FullRecipe } from '~/types/recipe.interface';
import { TestIdName } from '~/utils/testId-name.enum';

import { DraftModalBody } from '../modal/modal-body/draft-modal-body';
import { UniversalModal } from '../modal/universal-modal';
import { RecipeFormIngredients } from './recipe-form-parts/recipe-form-ingredients';
import { RecipeFormMain } from './recipe-form-parts/recipe-form-main';
import { RecipeFormSteps } from './recipe-form-parts/recipe-form-steps';
import { RecipeFormData, recipeSchema } from './validation-scheme/recipe.scheme';

type RecipeFormProps = {
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

export const RecipeForm = ({ recipe }: RecipeFormProps) => {
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const hasChanges = false;

    const formMethods = useForm<RecipeFormData>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: false,
        resolver: yupResolver(recipeSchema),
        defaultValues: DEFAULT_FORMDATA,
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
            <Center
                flexDirection='column'
                as='form'
                onSubmit={handleSubmit(onSubmit)}
                w='100%'
                data-test-id={TestIdName.RecipeForm}
                gap={{ base: 8, lg: 10 }}
                px={4}
            >
                <RecipeFormMain formMethods={formMethods} />
                <VStack w={{ base: '100%', sm: '50%' }} alignItems='start'>
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
                    >
                        <EditIcon mr={2} />
                        Сохранить черновик
                    </Button>
                    <Button colorScheme='black' w='100%' size='lg' maxW={{ sm: '15.375rem' }}>
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
                <DraftModalBody handleExit={handleConfirmExit} />
            </UniversalModal>
        </>
    );
};
