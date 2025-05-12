import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { InputNameToPlaceholder } from '~/utils/constant';

import { PasswordInput } from '../password-input/password-input';
import { SignInFormData, signInSchema } from './validation-scheme/sign-in.scheme';

export const SignInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: yupResolver(signInSchema),
    });

    const onSubmit = (data: SignInFormData) => {
        console.log(data);
    };

    return (
        <Box as='form' onSubmit={handleSubmit(onSubmit)} w='100%'>
            <VStack spacing={6} align='stretch'>
                <FormControl isInvalid={!!errors.login}>
                    <FormLabel htmlFor='login'>Логин</FormLabel>
                    <Input
                        variant='baseFormInput'
                        size='lg'
                        id='login'
                        placeholder={InputNameToPlaceholder['username']}
                        {...register('login')}
                        maxLength={50}
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
                >
                    Войти
                </Button>
            </VStack>
        </Box>
    );
};
