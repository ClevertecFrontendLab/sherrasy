import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    VStack,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { PasswordInput } from '~/components/password-input/password-input';
import { InputNameToPlaceholder } from '~/utils/constant';

import { SignUpFormData } from '../validation-scheme/sign-up.scheme';

export const SignUpStepTwo = () => {
    const {
        register,
        formState: { errors, isValid },
    } = useFormContext<SignUpFormData>();

    return (
        <VStack spacing={6} w='100%'>
            <FormControl isInvalid={!!errors.username}>
                <FormLabel htmlFor='username'>Логин входа на сайт</FormLabel>
                <Input
                    variant='baseFormInput'
                    size='lg'
                    id='username'
                    placeholder={InputNameToPlaceholder['username']}
                    {...register('username')}
                    maxLength={50}
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            <PasswordInput<SignUpFormData> type='password' register={register} errors={errors} />
            <PasswordInput<SignUpFormData>
                type='confirmPassword'
                register={register}
                errors={errors}
            />
            <HStack mt={4}>
                <Button flex={1} colorScheme='black' type='submit' isDisabled={!isValid}>
                    Зарегистрироваться
                </Button>
            </HStack>
        </VStack>
    );
};
