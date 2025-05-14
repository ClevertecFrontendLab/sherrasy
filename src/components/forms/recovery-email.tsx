import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '~/store/hooks';
import { setCurrentEmail } from '~/store/user/user-slice';
import { InputNameToPlaceholder } from '~/utils/constant';

import { EmailFormData, emailSchema } from './validation-scheme/email.sheme';

export const RecoveryEmailForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<EmailFormData>({
        mode: 'onChange',
        resolver: yupResolver(emailSchema),
    });
    const dispatch = useAppDispatch();

    const onSubmit = (data: EmailFormData) => {
        console.log(data);
        dispatch(setCurrentEmail(data.email));
        onSuccess();
    };
    return (
        <Box as='form' onSubmit={handleSubmit(onSubmit)} w='100%' mt={4}>
            <VStack spacing={6} w='100%'>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor='email'>Ваш email</FormLabel>
                    <Input
                        variant='baseFormInput'
                        size='lg'
                        id='email'
                        type='email'
                        placeholder={InputNameToPlaceholder['email']}
                        {...register('email')}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <Button mt={4} colorScheme='black' type='submit' w='100%' isDisabled={!isValid}>
                    Получить код
                </Button>
            </VStack>
        </Box>
    );
};
