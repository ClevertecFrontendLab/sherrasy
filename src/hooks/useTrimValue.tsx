import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

export const useTrimOnBlur =
    <T extends FieldValues>(setValue: UseFormSetValue<T>, fieldName: Path<T>) =>
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const trimmedValue = e.target.value.trim();
        setValue(fieldName, trimmedValue as PathValue<T, Path<T>>, { shouldValidate: true });
    };
