import * as yup from 'yup';

export const signInSchema = yup.object({
    login: yup.string().required('Введите логин').max(50, 'Максимальная длина 50 символов'),
    password: yup.string().required('Введите пароль').max(50, 'Максимальная длина 50 символов'),
});

export type SignInFormData = yup.InferType<typeof signInSchema>;
