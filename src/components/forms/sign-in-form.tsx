import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useUniversalModal } from '~/hooks/useUniversalModal';
import { useLoginMutation } from '~/query/services/auth';
import { DEFAULT_ERROR_LOG, InputNameToPlaceholder, TestIdName } from '~/utils/constant';

import { PasswordInput } from '../inputs/password-input/password-input';
import { UniversalModal } from '../modal/universal-modal';
import { SignInFormData, signInSchema } from './validation-scheme/sign-in.scheme';

export const SignInForm = () => {
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const handleOpenModal = () => openModal('login');
    const [login, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        mode: 'onChange',
        resolver: yupResolver(signInSchema),
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await login(data).unwrap();
            console.log(data, 'd');
            console.log('Login successful', result);
        } catch (err) {
            console.error(DEFAULT_ERROR_LOG, err);
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
                <FormControl isInvalid={!!errors.login}>
                    <FormLabel htmlFor='login'>Логин</FormLabel>
                    <Input
                        variant='baseFormInput'
                        size='lg'
                        id='login'
                        placeholder={InputNameToPlaceholder['login']}
                        {...register('login')}
                        data-test-id={TestIdName.InputLogin}
                    />
                    <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
                </FormControl>
                <PasswordInput<SignInFormData>
                    type='password'
                    register={register}
                    errors={errors}
                />
                <Button
                    mt='100px'
                    colorScheme='black'
                    isLoading={isSubmitting || isLoading}
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
