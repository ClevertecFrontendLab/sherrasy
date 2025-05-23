import * as yup from 'yup';

import { FieldRegex, ValidationMessage } from '~/utils/forms.constant';

export const stepOneSchema = yup.object({
    firstName: yup
        .string()
        .required(ValidationMessage.RequiredFirstName)
        .matches(FieldRegex.Firstletter, ValidationMessage.InvalidNameLetter)
        .matches(FieldRegex.Name, ValidationMessage.InvalidName)
        .max(50, ValidationMessage.MaxLength),
    lastName: yup
        .string()
        .required(ValidationMessage.RequiredLastName)
        .matches(FieldRegex.Firstletter, ValidationMessage.InvalidNameLetter)
        .matches(FieldRegex.Name, ValidationMessage.InvalidName)
        .max(50, ValidationMessage.MaxLength),
    email: yup
        .string()
        .required(ValidationMessage.RequiredEmail)
        .max(50, ValidationMessage.MaxLength)
        .matches(FieldRegex.Email, ValidationMessage.InvalidEmail),
});

export const stepTwoSchema = yup.object({
    login: yup
        .string()
        .required(ValidationMessage.RequiredLogin)
        .max(50, ValidationMessage.MaxLength)
        .matches(FieldRegex.Login, ValidationMessage.InvalidFormat)
        .min(5, ValidationMessage.InvalidFormat),

    password: yup
        .string()
        .required(ValidationMessage.RequiredPassword)
        .max(50, ValidationMessage.MaxLength)
        .matches(FieldRegex.Password, ValidationMessage.InvalidFormat)
        .min(8, ValidationMessage.InvalidFormat),

    confirmPassword: yup
        .string()
        .required(ValidationMessage.RequiredPasswordConfirm)
        .oneOf([yup.ref('password')], ValidationMessage.InvalidPasswordConfirm),
});

export const recoveryFormSchema = yup.object({
    login: yup
        .string()
        .required(ValidationMessage.RequiredLogin)
        .max(50, ValidationMessage.MaxLength)
        .matches(FieldRegex.Login, ValidationMessage.InvalidFormat)
        .min(5, ValidationMessage.InvalidFormat),

    password: yup
        .string()
        .required(ValidationMessage.RequiredPassword)
        .max(50, ValidationMessage.MaxLength)
        .matches(FieldRegex.Password, ValidationMessage.InvalidFormat)
        .min(8, ValidationMessage.InvalidFormat),

    passwordConfirm: yup
        .string()
        .required(ValidationMessage.RequiredPasswordConfirm)
        .oneOf([yup.ref('password')], ValidationMessage.InvalidPasswordConfirm),
});

export const signUpSchema = stepOneSchema.concat(stepTwoSchema);

export type SignUpFormData = yup.InferType<typeof signUpSchema>;
export type RecoveryFormData = yup.InferType<typeof recoveryFormSchema>;
export type ExtendedRecoveryFormData = RecoveryFormData & {
    email: string;
};
