import * as yup from 'yup';

import { FieldRegex, ValidationMessage } from '~/utils/forms.constant';

export const emailSchema = yup.object({
    email: yup
        .string()
        .required(ValidationMessage.RequiredEmail)
        .max(50, ValidationMessage.MaxLength)
        .matches(FieldRegex.Email, ValidationMessage.InvalidEmail),
});

export type EmailFormData = yup.InferType<typeof emailSchema>;

export type EmailOTPData = {
    email: string;
    otpToken: string;
};
