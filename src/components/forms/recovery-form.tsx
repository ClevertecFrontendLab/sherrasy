import { Box, Button, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useResetPasswordMutation } from '~/query/services/auth';
import { useAppSelector } from '~/store/hooks';
import { getUserEmail } from '~/store/user/selectors';
import { InputNameToHelper } from '~/utils/forms.constant';
import { TestIdName } from '~/utils/testId-name.enum';

import { FormInput } from '../inputs/form-input/form-input';
import { PasswordInput } from '../inputs/password-input/password-input';
import { RecoveryFormData, recoveryFormSchema } from './validation-scheme/sign-up.scheme';

export const RecoveryForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const formMethods = useForm<RecoveryFormData>({
        mode: 'onChange',
        resolver: yupResolver(recoveryFormSchema),
    });
    const email = useAppSelector(getUserEmail) ?? '';
    const [resetPassword, { isSuccess }] = useResetPasswordMutation();
    const { handleSubmit } = formMethods;

    const onSubmit = async (data: RecoveryFormData) => {
        await resetPassword({ ...data, email });
    };

    useEffect(() => {
        if (isSuccess) {
            onSuccess();
        }
    }, [isSuccess, onSuccess]);

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
                    type='passwordConfirm'
                    formMethods={formMethods}
                    onSubmit={handleSubmit(onSubmit)}
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
        </Box>
    );
};
