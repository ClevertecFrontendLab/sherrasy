import * as yup from 'yup';

import { FieldRegex } from '~/utils/constant';

const stepOneSchema = yup.object({
    firstName: yup
        .string()
        .required('Введите имя')
        .matches(FieldRegex.Firstletter, 'Должно начинаться с кириллицы А-Я')
        .matches(FieldRegex.Name, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    lastName: yup
        .string()
        .required('Введите фамилию')
        .matches(FieldRegex.Firstletter, 'Должно начинаться с кириллицы А-Я')
        .matches(FieldRegex.Name, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    email: yup
        .string()
        .required('Введите e-mail')
        .matches(FieldRegex.Email, 'Введите корректный e-mail')
        .max(50, 'Максимальная длина 50 символов'),
});

export const stepTwoSchema = yup.object({
    username: yup
        .string()
        .required('Введите логин')
        .min(5, 'Не соответствует формату')
        .matches(FieldRegex.Username, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
    password: yup
        .string()
        .required('Введите пароль')
        .min(8, 'Не соответствует формату')
        .matches(FieldRegex.Password, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
    confirmPassword: yup
        .string()
        .required('Повторите пароль')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export const signUpSchema = stepOneSchema.concat(stepTwoSchema);

export type SignUpFormData = yup.InferType<typeof signUpSchema>;
export type RecoveryFormData = yup.InferType<typeof stepTwoSchema>;
