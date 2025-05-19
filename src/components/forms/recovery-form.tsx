import { Box, Button, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useResetPasswordMutation } from '~/query/services/auth';
import { useAppSelector } from '~/store/hooks';
import { getUserEmail } from '~/store/user/selectors';
import { InputNameToHelper, TestIdName } from '~/utils/constant';

import { FormInput } from '../inputs/form-input/form-input';
import { PasswordInput } from '../inputs/password-input/password-input';
import { RecoveryFormData, stepTwoSchema } from './validation-scheme/sign-up.scheme';

export const RecoveryForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const formMethods = useForm<RecoveryFormData>({
        mode: 'onChange',
        resolver: yupResolver(stepTwoSchema),
    });
    const email = useAppSelector(getUserEmail) ?? '';
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const {
        handleSubmit,
        formState: { isValid },
    } = formMethods;

    const onSubmit = async (data: RecoveryFormData) => {
        await resetPassword({ ...data, email })
            .unwrap()
            .then(() => {
                onSuccess();
            });
    };

    return (
        <Box as='form' onSubmit={handleSubmit(onSubmit)} w='100%' mt={4}>
            <VStack spacing={6} w='100%'>
                <FormInput<RecoveryFormData>
                    name='login'
                    testId={TestIdName.InputLogin}
                    formMethods={formMethods}
                    textHelper={InputNameToHelper.login}
                    onSubmit={handleSubmit(onSubmit)}
                />
                <PasswordInput<RecoveryFormData>
                    type='password'
                    formMethods={formMethods}
                    showHelper={true}
                    onSubmit={handleSubmit(onSubmit)}
                />
                <PasswordInput<RecoveryFormData>
                    type='confirmPassword'
                    formMethods={formMethods}
                    onSubmit={handleSubmit(onSubmit)}
                />
                <Button
                    mt={4}
                    colorScheme='black'
                    type='submit'
                    w='100%'
                    isDisabled={!isValid || isLoading}
                    data-test-id={TestIdName.SubmitBtn}
                >
                    Зарегистрироваться
                </Button>
            </VStack>
        </Box>
    );
};
