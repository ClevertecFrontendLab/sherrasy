import { FieldError, FieldErrors, FieldValues } from 'react-hook-form';

export const getNestedError = <T extends FieldValues>(
    errors: FieldErrors<T>,
    path: string,
): FieldError | undefined =>
    path.split('.').reduce<FieldError | undefined>(
        (err, key) => {
            if (!err || typeof err !== 'object') return undefined;
            return (err as Record<string, unknown>)[key] as FieldError | undefined;
        },
        errors as unknown as FieldError,
    );
