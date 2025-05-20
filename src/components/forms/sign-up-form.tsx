import { Flex, Progress, Stack, Text, useSteps } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useUniversalModal } from '~/hooks/useUniversalModal';
import { useSignupMutation } from '~/query/services/auth';
import { useAppDispatch } from '~/store/hooks';
import { setCurrentEmail } from '~/store/user/user-slice';
import { AppRoute, TestIdName } from '~/utils/constant';

import { UniversalModal } from '../modal/universal-modal';
import { SignUpStepOne } from './sign-up-steps/sign-up-step-one';
import { SignUpStepTwo } from './sign-up-steps/sign-up-step-two';
import { SignUpFormData, signUpSchema } from './validation-scheme/sign-up.scheme';

const steps = [{ title: 'Личная информация' }, { title: 'Логин и пароль' }];

export const SignUpForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });
    const [signup, { isLoading }] = useSignupMutation();

    const methods = useForm<SignUpFormData>({
        resolver: yupResolver(signUpSchema),
        mode: 'onChange',
    });

    const {
        trigger,
        handleSubmit,
        formState: { dirtyFields },
    } = methods;

    const calculateProgress = () => {
        const totalFields = 6;
        const validFields = Object.keys(dirtyFields).filter(
            (fieldName) => !methods.getFieldState(fieldName as keyof SignUpFormData).invalid,
        ).length;

        return Math.min((validFields * 100) / totalFields, 100);
    };

    const progress = calculateProgress();
    const email = methods.getValues('email');

    const nextStep = async () => {
        if (activeStep === 0) {
            const isValid = await trigger(['firstName', 'lastName', 'email']);
            if (!isValid) return;
            setActiveStep(1);
            dispatch(setCurrentEmail(email));
        }
    };
    const onSubmit = async (data: SignUpFormData) => {
        await signup(data)
            .unwrap()
            .then(() => openModal('verification'));
    };
    const handleClose = () => {
        closeModal();
        navigate(AppRoute.SignIn);
    };

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction='column' alignItems='start' w='100%' gap={6}>
                        <Stack w='100%' gap={0}>
                            <Text>
                                Шаг {activeStep + 1}. {steps[activeStep].title}
                            </Text>
                            <Progress
                                data-test-id={TestIdName.SignUpProgress}
                                colorScheme='lime'
                                size='sm'
                                hasStripe
                                value={progress}
                            />
                        </Stack>
                        {activeStep === 0 ? (
                            <SignUpStepOne onNext={nextStep} />
                        ) : (
                            <SignUpStepTwo
                                isDisabled={isLoading}
                                onSubmit={handleSubmit(onSubmit)}
                            />
                        )}
                    </Flex>
                </form>
            </FormProvider>
            <UniversalModal
                isOpen={isOpen}
                onClose={handleClose}
                config={config}
                email={email}
                testId={TestIdName.ModalSignUpSuccess}
            />
        </>
    );
};
