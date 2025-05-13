import * as yup from 'yup';

import { FieldRegex } from '~/utils/constant';

export const emailSchema = yup.object({
    email: yup
        .string()
        .required('Введите e-mail')
        .matches(FieldRegex.Email, 'Введите корректный e-mail')
        .max(50, 'Максимальная длина 50 символов'),
});

export type EmailFormData = yup.InferType<typeof emailSchema>;
