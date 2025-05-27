import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputProps,
    NumberInputStepper,
} from '@chakra-ui/react';
import { FieldError, FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';

import { InputNameToLabel, InputNameToPlaceholder } from '~/utils/forms.constant';

interface FormNumberInputProps<T extends FieldValues> extends Omit<NumberInputProps, 'name'> {
    name: Path<T>;
    formMethods: UseFormReturn<T>;
    testId?: string;
    stepOneValid?: boolean;
}

export function FormNumberInput<T extends FieldValues>({
    name,
    formMethods,
    testId,
    stepOneValid,
    ...props
}: FormNumberInputProps<T>) {
    const {
        register,
        formState: { errors },
        setValue,
        watch,
    } = formMethods;

    const errorText = (errors[name] as FieldError)?.message;
    const value = watch(name);
    const stringValue = value === undefined || isNaN(value) ? '0' : String(value);
    console.log(errors);
    return (
        <FormControl isInvalid={!!errors[name]}>
            <HStack>
                <FormLabel
                    color='black'
                    lineHeight={6}
                    fontSize='md'
                    fontWeight='normal'
                    htmlFor={name.toString()}
                >
                    {InputNameToLabel[name]}
                </FormLabel>
                <NumberInput
                    value={stringValue}
                    onChange={(valueString) => {
                        const numValue = valueString === '' ? undefined : Number(valueString);
                        setValue(name, numValue as PathValue<T, Path<T>>, { shouldValidate: true });
                    }}
                    {...props}
                >
                    <NumberInputField
                        id={name.toString()}
                        {...register(name, {
                            valueAsNumber: true,
                        })}
                        placeholder={InputNameToPlaceholder[name]}
                        data-test-id={testId}
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </HStack>{' '}
            {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
        </FormControl>
    );
}
