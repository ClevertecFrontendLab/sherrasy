import { Button, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { FormInput } from '~/components/inputs/form-input/form-input';
import { PasswordInput } from '~/components/inputs/password-input/password-input';
import { InputNameToHelper } from '~/utils/forms.constant';
import { TestIdName } from '~/utils/testId-name.enum';

import { SignUpFormData } from '../validation-scheme/sign-up.scheme';

export const SignUpStepTwo = ({ onSubmit }: { isDisabled: boolean; onSubmit: () => void }) => {
    const formMethods = useFormContext<SignUpFormData>();
    return (
        <VStack spacing={6} w='100%' data-test-id={TestIdName.SignUpForm}>
            <FormInput<SignUpFormData>
                name='login'
                testId={TestIdName.InputLogin}
                formMethods={formMethods}
                textHelper={InputNameToHelper.login}
                onSubmit={onSubmit}
            />
            <PasswordInput<SignUpFormData>
                type='password'
                formMethods={formMethods}
                showHelper={true}
                onSubmit={onSubmit}
            />
            <PasswordInput<SignUpFormData>
                type='confirmPassword'
                formMethods={formMethods}
                onSubmit={onSubmit}
            />
            <Button
                mt={4}
                colorScheme='black'
                type='submit'
                w='100%'
                data-test-id={TestIdName.SubmitBtn}
            >
                Зарегистрироваться
            </Button>
        </VStack>
    );
};
