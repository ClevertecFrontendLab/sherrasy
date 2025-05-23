export const FieldRegex = {
    Firstletter: /^[А-Яа-яЁё]/,
    Name: /^[А-ЯЁа-яё-]+$/,
    Login: /^[A-Za-z0-9!@#$&_+\-.]{5,}$/,
    Password: /^(?!.*[А-Яа-яЁё\s])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$&_+-.]{8,}$/,
    Email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/,
} as const;

export const ValidationMessage = {
    RequiredFirstName: 'Введите имя',
    RequiredLastName: 'Введите фамилию',
    RequiredLogin: 'Введите логин',
    RequiredPassword: 'Введите пароль',
    RequiredPasswordConfirm: 'Повторите пароль',
    RequiredEmail: 'Введите e-mail',
    InvalidNameLetter: 'Должно начинаться с кириллицы А-Я',
    InvalidName: 'Только кириллица А-Я, и "-"',
    InvalidEmail: 'Введите корректный e-mail',
    InvalidPasswordConfirm: 'Пароли должны совпадать',
    InvalidFormat: 'Не соответствует формату',
    MaxLength: 'Максимальная длина 50 символов',
} as const;

export const InputNameToPlaceholder: Record<string, string> = {
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'e-mail',
    login: 'Введите логин',
    password: 'Пароль для сайта',
    confirmPassword: 'Повторите пароль',
};

export const InputNameToLabel: Record<string, string> = {
    firstName: 'Ваше имя',
    lastName: 'Ваша фамилия',
    email: 'Ваш e-mail',
    login: 'Логин для входа на сайт',
    password: 'Пароль',
    confirmPassword: 'Повторите пароль',
};

export const InputNameToHelper: Record<string, string> = {
    login: 'Логин не менее 5 символов, только латиница',
    password: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
};
