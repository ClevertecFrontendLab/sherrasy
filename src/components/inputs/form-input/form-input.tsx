import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    InputProps,
} from '@chakra-ui/react';
import { FieldError, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { useSubmitOnEnter } from '~/hooks/useSubmitOnEnter';
import { useTrimOnBlur } from '~/hooks/useTrimValue';
import { InputNameToLabel, InputNameToPlaceholder } from '~/utils/forms.constant';

interface FormInputProps<T extends FieldValues> extends Omit<InputProps, 'name'> {
    name: Path<T>;
    formMethods: UseFormReturn<T>;
    onSubmit: () => void;
    testId?: string;
    textHelper?: string;
    stepOneValid?: boolean;
}

export function FormInput<T extends FieldValues>({
    name,
    formMethods,
    testId,
    textHelper,
    onSubmit,
    stepOneValid,
    ...props
}: FormInputProps<T>) {
    const {
        register,
        formState: { errors, isValid },
        setValue,
    } = formMethods;
    const handleBlur = useTrimOnBlur<T>(setValue, name);
    const isValidData = stepOneValid ? stepOneValid : isValid;
    const handleKeyDown = useSubmitOnEnter(isValidData, onSubmit);
    const errorText = (errors[name] as FieldError)?.message;
    return (
        <FormControl isInvalid={!!errors[name]}>
            <FormLabel
                color='black'
                lineHeight={6}
                fontSize='md'
                fontWeight='normal'
                htmlFor={name.toString()}
            >
                {InputNameToLabel[name]}
            </FormLabel>
            <Input
                id={name.toString()}
                {...register(name)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                variant='baseFormInput'
                size='lg'
                placeholder={InputNameToPlaceholder[name]}
                data-test-id={testId}
                {...props}
            />
            {textHelper && <FormHelperText>{textHelper}</FormHelperText>}
            {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
        </FormControl>
    );
}
