import { Button, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { FormInput } from '~/components/inputs/form-input/form-input';
import { TestIdName } from '~/utils/testId-name.enum';

import { SignUpFormData } from '../validation-scheme/sign-up.scheme';

export const SignUpStepOne = ({ onNext }: { onNext: () => void }) => {
    const formMethods = useFormContext<SignUpFormData>();
    const getAllFieldsFilled = () => {
        const values = formMethods.getValues();
        return ['firstName', 'lastName', 'email'].every((field) => {
            const value = values[field as keyof SignUpFormData];
            return Boolean(value);
        });
    };
    const stepOneValid = getAllFieldsFilled();
    return (
        <VStack spacing={6} w='100%' data-test-id={TestIdName.SignUpForm}>
            <FormInput<SignUpFormData>
                name='firstName'
                testId={TestIdName.InputFirstName}
                formMethods={formMethods}
                onSubmit={onNext}
                stepOneValid={stepOneValid}
            />
            <FormInput<SignUpFormData>
                name='lastName'
                testId={TestIdName.InputLastName}
                formMethods={formMethods}
                onSubmit={onNext}
                stepOneValid={stepOneValid}
            />
            <FormInput<SignUpFormData>
                name='email'
                type='email'
                testId={TestIdName.InputEmail}
                formMethods={formMethods}
                onSubmit={onNext}
                stepOneValid={stepOneValid}
            />
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
