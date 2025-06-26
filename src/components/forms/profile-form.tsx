import { Button, Center, HStack, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { FormInput } from '~/components/inputs/form-input/form-input';
import { useUpdateUserMutation } from '~/query/services/profile';
import { Profile } from '~/types/profile.type';
import { InputNameToHelper } from '~/utils/forms.constant';
import { TestIdName } from '~/utils/testId-name.enum';

import { ProfileFormData } from './validation-scheme/profile.scheme';

export const ProfileForm = ({ profile }: { profile: Profile }) => {
    const [updateUser] = useUpdateUserMutation();

    const { firstName = '', lastName = '', login = '', email = '' } = profile;
    const formMethods = useForm<ProfileFormData>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: false,
        defaultValues: { firstName, lastName, login, email },
    });
    const {
        handleSubmit,
        formState: { isDirty, isValid },
    } = formMethods;

    const onSubmit = async (data: ProfileFormData) => {
        await updateUser(data);
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
                <HStack w='100%'>
                    <FormInput<ProfileFormData>
                        name='firstName'
                        labelText='Имя'
                        formMethods={formMethods}
                    />
                    <FormInput<ProfileFormData>
                        name='lastName'
                        labelText='Фамилия'
                        formMethods={formMethods}
                    />
                </HStack>
                <HStack w='100%' alignItems='start'>
                    <FormInput<ProfileFormData>
                        name='email'
                        type='email'
                        labelText='E-mail'
                        formMethods={formMethods}
                        isDisabled
                    />
                    <FormInput<ProfileFormData>
                        name='login'
                        type='login'
                        labelText='Логин'
                        formMethods={formMethods}
                        isDisabled
                        textHelper={InputNameToHelper.login}
                    />
                </HStack>

                <Button
                    mt={4}
                    colorScheme='black'
                    type='submit'
                    alignSelf='start'
                    isDisabled={!isDirty || !isValid}
                >
                    Сохранить изменения
                </Button>
            </VStack>
        </Center>
    );
};
