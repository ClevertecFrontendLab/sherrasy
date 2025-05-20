import * as yup from 'yup';

import { FieldRegex } from '~/utils/constant';

export const signInSchema = yup.object({
    login: yup
        .string()
        .required('Введите логин')
        .max(50, 'Максимальная длина 50 символов')
        .matches(FieldRegex.Login, 'Не соответствует формату')
        .min(5, 'Не соответствует формату'),
    password: yup
        .string()
        .required('Введите пароль')
        .max(50, 'Максимальная длина 50 символов')
        .matches(FieldRegex.Password, 'Не соответствует формату')
        .min(8, 'Не соответствует формату'),
});

export type SignInFormData = yup.InferType<typeof signInSchema>;
