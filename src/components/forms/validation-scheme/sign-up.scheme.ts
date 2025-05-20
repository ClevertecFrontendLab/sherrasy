import * as yup from 'yup';

import { FieldRegex } from '~/utils/constant';

export const stepOneSchema = yup.object({
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
        .max(50, 'Максимальная длина 50 символов')
        .matches(FieldRegex.Email, 'Введите корректный e-mail'),
});

export const stepTwoSchema = yup.object({
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

    confirmPassword: yup
        .string()
        .required('Повторите пароль')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export const recoveryFormSchema = yup.object({
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

    passwordConfirm: yup
        .string()
        .required('Повторите пароль')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export const signUpSchema = stepOneSchema.concat(stepTwoSchema);

export type SignUpFormData = yup.InferType<typeof signUpSchema>;
export type RecoveryFormData = yup.InferType<typeof recoveryFormSchema>;
export type ExtendedRecoveryFormData = RecoveryFormData & {
    email: string;
};
