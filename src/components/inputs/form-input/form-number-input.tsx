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
import { Controller, FieldError, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { InputNameToLabel } from '~/utils/forms.constant';

interface FormNumberInputProps<T extends FieldValues> extends Omit<NumberInputProps, 'name'> {
    name: Path<T>;
    formMethods: UseFormReturn<T>;
    testId?: string;
}

export function FormNumberInput<T extends FieldValues>({
    name,
    formMethods,
    testId,
}: FormNumberInputProps<T>) {
    const {
        formState: { errors },
        control,
    } = formMethods;

    const errorText = (errors[name] as FieldError)?.message;
    return (
        <FormControl isInvalid={!!errors[name]}>
            <HStack>
                <FormLabel
                    color='black'
                    fontSize={{ base: 'sm', lg: 'md' }}
                    lineHeight={{ base: 5, lg: 6 }}
                    fontWeight='semibold'
                    htmlFor={name.toString()}
                >
                    {InputNameToLabel[name]}
                </FormLabel>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <NumberInput size='md' maxW='5.625rem' value={value} onChange={onChange}>
                            <NumberInputField data-test-id={testId} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    )}
                />
            </HStack>{' '}
            {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
        </FormControl>
    );
}
