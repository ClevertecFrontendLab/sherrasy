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
import { InputNameToPlaceholder, TestIdName } from '~/utils/constant';

import { PasswordInput } from '../inputs/password-input/password-input';
import { UniversalModal } from '../modal/universal-modal';
import { SignInFormData, signInSchema } from './validation-scheme/sign-in.scheme';

export const SignInForm = () => {
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const handleOpenModal = () => openModal('login');
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        mode: 'onChange',
        resolver: yupResolver(signInSchema),
    });

    const onSubmit = (data: SignInFormData) => {
        console.log(data, 'd');
        handleOpenModal();
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
                        placeholder={InputNameToPlaceholder['username']}
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
                    isLoading={isSubmitting}
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
                    onClick={() => console.log(getValues())}
                    data-test-id={TestIdName.RepeatBtn}
                >
                    Повторить
                </Button>
            </UniversalModal>
        </Stack>
    );
};
