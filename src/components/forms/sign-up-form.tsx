import { Flex, Progress, Stack, Text, useSteps } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useUniversalModal } from '~/hooks/useUniversalModal';
import { useSignupMutation } from '~/query/services/auth';
import { useAppDispatch } from '~/store/hooks';
import { setCurrentEmail } from '~/store/user/user-slice';
import { DEFAULT_ERROR_LOG, TestIdName } from '~/utils/constant';

import { UniversalModal } from '../modal/universal-modal';
import { SignUpStepOne } from './sign-up-steps/sign-up-step-one';
import { SignUpStepTwo } from './sign-up-steps/sign-up-step-two';
import { SignUpFormData, signUpSchema } from './validation-scheme/sign-up.scheme';

const steps = [{ title: 'Личная информация' }, { title: 'Логин и пароль' }];

export const SignUpForm = () => {
    const dispatch = useAppDispatch();
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

        return Math.min((validFields / totalFields) * 100, 100);
    };

    const progress = calculateProgress();

    const nextStep = async () => {
        if (activeStep === 0) {
            const isValid = await trigger(['firstName', 'lastName', 'email']);
            if (!isValid) return;
            setActiveStep(1);
            const email = methods.getValues('email');
            dispatch(setCurrentEmail(email));
        }
    };
    const onSubmit = async (data: SignUpFormData) => {
        try {
            const result = await signup(data).unwrap();
            console.log(data, 'd');
            console.log(result);
            openModal('verification');
        } catch (err) {
            console.error(DEFAULT_ERROR_LOG, err);
        }
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
                onClose={closeModal}
                config={config}
                testId={TestIdName.ModalSignUpSuccess}
            />
        </>
    );
};
