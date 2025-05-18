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

export const SignUpStepTwo = ({ isDisabled }: { isDisabled: boolean }) => {
    const {
        register,
        formState: { errors, isValid },
    } = useFormContext<SignUpFormData>();

    return (
        <VStack spacing={6} w='100%' data-test-id={TestIdName.SignUpForm}>
            <FormControl isInvalid={!!errors.login}>
                <FormLabel htmlFor='login'>Логин входа на сайт</FormLabel>
                <Input
                    variant='baseFormInput'
                    size='lg'
                    id='login'
                    placeholder={InputNameToPlaceholder['login']}
                    {...register('login')}
                    data-test-id={TestIdName.InputLogin}
                />
                <FormHelperText>Логин не менее 5 символов, только латиница</FormHelperText>
                <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
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
                isDisabled={!isValid || isDisabled}
                data-test-id={TestIdName.SubmitBtn}
            >
                Зарегистрироваться
            </Button>
        </VStack>
    );
};
