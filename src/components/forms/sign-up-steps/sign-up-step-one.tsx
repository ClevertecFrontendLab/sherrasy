import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { InputNameToPlaceholder, TestIdName } from '~/utils/constant';

import { SignUpFormData } from '../validation-scheme/sign-up.scheme';

export const SignUpStepOne = ({ onNext }: { onNext: () => void }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext<SignUpFormData>();

    return (
        <VStack spacing={6} w='100%' data-test-id={TestIdName.SignUpForm}>
            <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor='firstName'>Ваше имя</FormLabel>
                <Input
                    variant='baseFormInput'
                    size='lg'
                    id='firstName'
                    placeholder={InputNameToPlaceholder['firstName']}
                    {...register('firstName')}
                    data-test-id={TestIdName.InputFirstName}
                />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor='lastName'>Ваша фамилия</FormLabel>
                <Input
                    variant='baseFormInput'
                    size='lg'
                    id='lastName'
                    placeholder={InputNameToPlaceholder['lastName']}
                    {...register('lastName')}
                    data-test-id={TestIdName.InputLastName}
                />
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor='email'>Ваш email</FormLabel>
                <Input
                    variant='baseFormInput'
                    size='lg'
                    id='email'
                    type='email'
                    placeholder={InputNameToPlaceholder['email']}
                    {...register('email')}
                    data-test-id={TestIdName.InputEmail}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <Button
                mt={4}
                colorScheme='black'
                onClick={onNext}
                w='100%'
                data-test-id={TestIdName.SubmitBtn}
            >
                Далее
            </Button>
        </VStack>
    );
};
