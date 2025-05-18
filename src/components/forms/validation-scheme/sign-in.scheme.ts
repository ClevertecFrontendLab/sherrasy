import * as yup from 'yup';

import { FieldRegex } from '~/utils/constant';

export const signInSchema = yup.object({
    login: yup
        .string()
        .required('Введите логин')
        .min(5, 'Не соответствует формату')
        .matches(FieldRegex.Login, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
    password: yup
        .string()
        .required('Введите пароль')
        .min(8, 'Не соответствует формату')
        .matches(FieldRegex.Password, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
});

export type SignInFormData = yup.InferType<typeof signInSchema>;
