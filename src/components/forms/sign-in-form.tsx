import { Button, Stack, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { StatusCodes } from 'http-status-codes';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useUniversalModal } from '~/hooks/useUniversalModal';
import { useLoginMutation } from '~/query/services/auth';
import { ApiQueryError } from '~/types/api-message.type';
import { AppRoute, TestIdName } from '~/utils/constant';

import { FormInput } from '../inputs/form-input/form-input';
import { PasswordInput } from '../inputs/password-input/password-input';
import { UniversalModal } from '../modal/universal-modal';
import { SignInFormData, signInSchema } from './validation-scheme/sign-in.scheme';

export const SignInForm = () => {
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const navigate = useNavigate();
    const handleOpenModal = () => openModal('login');
    const [login] = useLoginMutation();
    const formMethods = useForm<SignInFormData>({
        mode: 'onChange',
        resolver: yupResolver(signInSchema),
    });
    const { handleSubmit } = formMethods;
    const onSubmit = async (data: SignInFormData) => {
        try {
            await login(data)
                .unwrap()
                .then(() => navigate(AppRoute.Main));
        } catch (error) {
            const { status } = error as ApiQueryError;
            if (status < StatusCodes.INTERNAL_SERVER_ERROR) return;
            handleOpenModal();
        }
    };
    const handleRepeat = async () => {
        await handleSubmit(onSubmit)();
    };

    return (
        <Stack
            as='form'
            onSubmit={handleSubmit(onSubmit)}
            w='100%'
            data-test-id={TestIdName.SignInForm}
        >
            <VStack spacing={6} align='stretch'>
                <FormInput<SignInFormData>
                    name='login'
                    testId={TestIdName.InputLogin}
                    formMethods={formMethods}
                    onSubmit={handleSubmit(onSubmit)}
                />
                <PasswordInput<SignInFormData>
                    type='password'
                    formMethods={formMethods}
                    onSubmit={handleSubmit(onSubmit)}
                />
                <Button
                    mt='100px'
                    colorScheme='black'
                    type='submit'
                    w='100%'
                    data-test-id={TestIdName.SubmitBtn}
                >
                    Войти
                </Button>
            </VStack>
            <UniversalModal
                isOpen={isOpen}
                onClose={closeModal}
                config={config}
                testId={TestIdName.ModalSignIn}
            >
                <Button
                    mt={8}
                    colorScheme='black'
                    w='100%'
                    onClick={handleRepeat}
                    data-test-id={TestIdName.RepeatBtn}
                >
                    Повторить
                </Button>
            </UniversalModal>
        </Stack>
    );
};
