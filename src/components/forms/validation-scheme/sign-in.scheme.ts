import * as yup from 'yup';

import { FieldRegex, ValidationMessage } from '~/utils/forms.constant';

export const signInSchema = yup.object({
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
});

export type SignInFormData = yup.InferType<typeof signInSchema>;
