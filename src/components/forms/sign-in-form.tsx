import { Button, Stack, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { StatusCodes } from 'http-status-codes';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useUniversalModal } from '~/hooks/useUniversalModal';
import { useLoginMutation } from '~/query/services/auth';
import { ApiQueryError } from '~/types/api-message.type';
import { AppRoute } from '~/utils/constant';
import { TestIdName } from '~/utils/testId-name.enum';

import { FormInput } from '../inputs/form-input/form-input';
import { PasswordInput } from '../inputs/password-input/password-input';
import { UniversalModal } from '../modal/universal-modal';
import { SignInFormData, signInSchema } from './validation-scheme/sign-in.scheme';

export const SignInForm = () => {
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const navigate = useNavigate();
    const handleOpenModal = useCallback(() => {
        openModal('login');
    }, []);
    const [login, { isSuccess, isError, error, reset }] = useLoginMutation();
    const formMethods = useForm<SignInFormData>({
        mode: 'onChange',
        resolver: yupResolver(signInSchema),
    });
    const { handleSubmit, reset: resetForm } = formMethods;
    const onSubmit = async (data: SignInFormData) => {
        await login(data);
    };

    const handleRepeat = async () => {
        await handleSubmit(onSubmit)();
    };
    const handleClose = async () => {
        closeModal();
        resetForm();
        reset();
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(AppRoute.Main);
        }
        if (isError) {
            const { status } = error as ApiQueryError;
            if (status < StatusCodes.INTERNAL_SERVER_ERROR) return;
            handleOpenModal();
        }
    }, [isSuccess, isError, error, handleOpenModal, navigate]);

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
                onClose={handleClose}
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
