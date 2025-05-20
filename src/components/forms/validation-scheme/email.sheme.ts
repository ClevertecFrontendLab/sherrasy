import * as yup from 'yup';

import { FieldRegex } from '~/utils/constant';

export const emailSchema = yup.object({
    email: yup
        .string()
        .required('Введите e-mail')
        .max(50, 'Максимальная длина 50 символов')
        .matches(FieldRegex.Email, 'Введите корректный e-mail'),
});

export type EmailFormData = yup.InferType<typeof emailSchema>;

export type EmailOTPData = {
    email: string;
    otpToken: string;
};
