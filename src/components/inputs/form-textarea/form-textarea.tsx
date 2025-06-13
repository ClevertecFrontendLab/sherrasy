import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea,
    TextareaProps,
} from '@chakra-ui/react';
import { FieldError, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { useTrimOnBlur } from '~/hooks/useTrimValue';
import { InputNameToLabel, InputNameToPlaceholder } from '~/utils/forms.constant';
import { getNestedError } from '~/utils/helpers/get-nested-error';

interface FormTextareaProps<T extends FieldValues> extends Omit<TextareaProps, 'name'> {
    name: Path<T>;
    formMethods: UseFormReturn<T>;
    testId?: string;
    stepOneValid?: boolean;
}

export function FormTextarea<T extends FieldValues>({
    name,
    formMethods,
    testId,
    stepOneValid,
    ...props
}: FormTextareaProps<T>) {
    const {
        register,
        formState: { errors },
        setValue,
    } = formMethods;
    const handleBlur = useTrimOnBlur<T>(setValue, name);
    const isSteps = name.includes('steps');
    const placeholderText = isSteps
        ? InputNameToPlaceholder.stepDescription
        : InputNameToPlaceholder[name];

    const error = name.includes('.')
        ? getNestedError<T>(errors, name)
        : (errors[name] as FieldError | undefined);

    const errorText = error?.message;

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel
                color='black'
                lineHeight={6}
                fontSize='md'
                fontWeight='normal'
                htmlFor={name.toString()}
            >
                {InputNameToLabel[name]}
            </FormLabel>
            <Textarea
                id={name.toString()}
                {...register(name)}
                onBlur={handleBlur}
                variant='outline'
                size='sm'
                resize='vertical'
                placeholder={placeholderText}
                data-test-id={testId}
                {...props}
            />
            {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
        </FormControl>
    );
}
