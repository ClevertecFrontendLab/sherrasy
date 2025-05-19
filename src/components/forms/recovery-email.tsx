import { Box, Button, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useForgotPasswordMutation } from '~/query/services/auth';
import { useAppDispatch } from '~/store/hooks';
import { setCurrentEmail } from '~/store/user/user-slice';
import { TestIdName } from '~/utils/constant';

import { FormInput } from '../inputs/form-input/form-input';
import { EmailFormData, emailSchema } from './validation-scheme/email.sheme';

export const RecoveryEmailForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const formMethods = useForm<EmailFormData>({
        mode: 'onChange',
        resolver: yupResolver(emailSchema),
    });
    const {
        handleSubmit,
        formState: { isValid },
    } = formMethods;
    const dispatch = useAppDispatch();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const onSubmit = async (data: EmailFormData) => {
        await forgotPassword(data);
        dispatch(setCurrentEmail(data.email));
        onSuccess();
    };
    return (
        <Box as='form' onSubmit={handleSubmit(onSubmit)} w='100%' mt={4}>
            <VStack spacing={6} w='100%'>
                <FormInput<EmailFormData>
                    name='email'
                    type='email'
                    testId={TestIdName.InputEmail}
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
                    Получить код
                </Button>
            </VStack>
        </Box>
    );
};
