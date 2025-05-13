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
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { EyeClosedIcon, EyeIcon } from '~/assets/icons/icons';
import { usePasswordToggle } from '~/hooks/usePasswordToggle';
import { InputNameToPlaceholder } from '~/utils/constant';

type PasswordFieldType = 'password' | 'confirmPassword';

interface PasswordFieldConfig {
    name: PasswordFieldType;
    placeholder: string;
    label: string;
}

const DEFAULT_PARAMS: Record<PasswordFieldType, PasswordFieldConfig> = {
    password: {
        name: 'password',
        label: 'Пароль',
        placeholder: InputNameToPlaceholder['password'],
    },
    confirmPassword: {
        name: 'confirmPassword',
        label: 'Повторите пароль',
        placeholder: InputNameToPlaceholder['confirmPassword'],
    },
};

type PasswordInputProps<T extends FieldValues> = {
    type: PasswordFieldType;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    showHelper?: boolean;
};

export const PasswordInput = <T extends FieldValues>({
    type,
    register,
    errors,
    showHelper,
}: PasswordInputProps<T>) => {
    const { name, placeholder, label } = DEFAULT_PARAMS[type];
    const { showPassword, handlers } = usePasswordToggle();
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
                    {...register(name as Path<T>)}
                    maxLength={50}
                />
                <InputRightElement top={1}>
                    <IconButton
                        aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                        icon={showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                        variant='chost'
                        size='lg'
                        {...handlers}
                    />
                </InputRightElement>
            </InputGroup>
            {showHelper && (
                <FormHelperText>
                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                </FormHelperText>
            )}
            <FormErrorMessage>{errors[name as Path<T>]?.message as string}</FormErrorMessage>
        </FormControl>
    );
};
