import { Button, Center, HStack, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { FormInput } from '~/components/inputs/form-input/form-input';
import { TestIdName } from '~/utils/testId-name.enum';

import { ProfileFormData } from './validation-scheme/profile.scheme';

export const ProfileForm = () => {
    const formMethods = useForm<ProfileFormData>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: false,
    });
    const { handleSubmit } = formMethods;

    const onSubmit = (data: ProfileFormData) => {
        console.log(data);
    };

    return (
        <Center
            onSubmit={handleSubmit(onSubmit)}
            flexDirection='column'
            as='form'
            w='100%'
            gap={{ base: 8, lg: 10 }}
            px={3}
        >
            <VStack spacing={6} w='100%' data-test-id={TestIdName.SignUpForm}>
                <HStack>
                    <FormInput<ProfileFormData> name='firstName' formMethods={formMethods} />
                    <FormInput<ProfileFormData> name='lastName' formMethods={formMethods} />
                </HStack>
                <HStack>
                    <FormInput<ProfileFormData>
                        name='email'
                        type='email'
                        formMethods={formMethods}
                    />
                    <FormInput<ProfileFormData>
                        name='login'
                        type='login'
                        formMethods={formMethods}
                    />
                </HStack>

                <Button mt={4} colorScheme='black' type='submit' w='100%'>
                    Сохранить изменения
                </Button>
            </VStack>
        </Center>
    );
};
