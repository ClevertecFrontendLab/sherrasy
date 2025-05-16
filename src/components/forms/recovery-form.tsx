import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { InputNameToPlaceholder, TestIdName } from '~/utils/constant';

import { PasswordInput } from '../inputs/password-input/password-input';
import { RecoveryFormData, stepTwoSchema } from './validation-scheme/sign-up.scheme';

export const RecoveryForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RecoveryFormData>({
        mode: 'onChange',
        resolver: yupResolver(stepTwoSchema),
    });

    const onSubmit = (data: RecoveryFormData) => {
        console.log(data);
        onSuccess();
    };
    return (
        <Box as='form' onSubmit={handleSubmit(onSubmit)} w='100%' mt={4}>
            <VStack spacing={6} w='100%'>
                <FormControl isInvalid={!!errors.username}>
                    <FormLabel htmlFor='username'>Логин входа на сайт</FormLabel>
                    <Input
                        variant='baseFormInput'
                        size='lg'
                        id='username'
                        placeholder={InputNameToPlaceholder['username']}
                        {...register('username')}
                        data-test-id={TestIdName.InputLogin}
                    />
                    <FormHelperText>Логин не менее 5 символов, только латиница</FormHelperText>
                    <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                </FormControl>
                <PasswordInput<RecoveryFormData>
                    type='password'
                    register={register}
                    errors={errors}
                    showHelper={true}
                />
                <PasswordInput<RecoveryFormData>
                    type='confirmPassword'
                    register={register}
                    errors={errors}
                />
                <Button
                    mt={4}
                    colorScheme='black'
                    type='submit'
                    w='100%'
                    isDisabled={!isValid}
                    data-test-id={TestIdName.SubmitBtn}
                >
                    Зарегистрироваться
                </Button>
            </VStack>
        </Box>
    );
};
