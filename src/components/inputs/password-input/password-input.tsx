import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { EyeClosedIcon, EyeIcon } from '~/assets/icons/icons';
import { usePasswordToggle } from '~/hooks/usePasswordToggle';
import { useSubmitOnEnter } from '~/hooks/useSubmitOnEnter';
import {
    InputNameToHelper,
    InputNameToLabel,
    InputNameToPlaceholder,
    TestIdName,
} from '~/utils/constant';

type PasswordFieldType = 'password' | 'confirmPassword';

interface PasswordFieldConfig {
    name: PasswordFieldType;
    placeholder: string;
    label: string;
}

const DEFAULT_PARAMS: Record<PasswordFieldType, PasswordFieldConfig> = {
    password: {
        name: 'password',
        label: InputNameToLabel['password'],
        placeholder: InputNameToPlaceholder['password'],
    },
    confirmPassword: {
        name: 'confirmPassword',
        label: InputNameToLabel['confirmPassword'],
        placeholder: InputNameToPlaceholder['confirmPassword'],
    },
};

type PasswordInputProps<T extends FieldValues> = {
    type: PasswordFieldType;
    formMethods: UseFormReturn<T>;
    onSubmit: () => void;
    showHelper?: boolean;
};

export const PasswordInput = <T extends FieldValues>({
    type,
    formMethods,
    onSubmit,
    showHelper,
}: PasswordInputProps<T>) => {
    const { name, placeholder, label } = DEFAULT_PARAMS[type];
    const { showPassword, handlers } = usePasswordToggle();
    const {
        register,
        formState: { errors, isValid },
    } = formMethods;
    const handleKeyDown = useSubmitOnEnter(isValid, onSubmit);

    return (
        <FormControl isInvalid={!!errors[name as Path<T>]}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <InputGroup>
                <Input
                    variant='baseFormInput'
                    size='lg'
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    {...register(name as Path<T>)}
                    data-test-id={
                        type === 'password'
                            ? TestIdName.InputPassword
                            : TestIdName.InputPasswordConfirm
                    }
                />
                <InputRightElement top={1}>
                    <IconButton
                        aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                        icon={showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                        variant='chost'
                        size='lg'
                        {...handlers}
                        data-test-id={TestIdName.PasswordBtn}
                    />
                </InputRightElement>
            </InputGroup>
            {showHelper && <FormHelperText>{InputNameToHelper.password}</FormHelperText>}
            <FormErrorMessage>{errors[name as Path<T>]?.message as string}</FormErrorMessage>
        </FormControl>
    );
};
