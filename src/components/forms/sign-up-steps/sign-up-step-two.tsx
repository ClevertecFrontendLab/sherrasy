import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { PasswordInput } from '~/components/inputs/password-input/password-input';
import { InputNameToPlaceholder, TestIdName } from '~/utils/constant';

import { SignUpFormData } from '../validation-scheme/sign-up.scheme';

export const SignUpStepTwo = () => {
    const {
        register,
        formState: { errors, isValid },
    } = useFormContext<SignUpFormData>();

    return (
        <VStack spacing={6} w='100%' data-test-id={TestIdName.SignUpForm}>
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
            <PasswordInput<SignUpFormData>
                type='password'
                register={register}
                errors={errors}
                showHelper={true}
            />
            <PasswordInput<SignUpFormData>
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
    );
};
