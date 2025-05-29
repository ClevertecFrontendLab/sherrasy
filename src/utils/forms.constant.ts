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
    Required: 'Обязательное поле',
    InvalidNameLetter: 'Должно начинаться с кириллицы А-Я',
    InvalidName: 'Только кириллица А-Я, и "-"',
    InvalidEmail: 'Введите корректный e-mail',
    InvalidPasswordConfirm: 'Пароли должны совпадать',
    InvalidFormat: 'Не соответствует формату',
    MaxLength: 'Максимальная длина 50 символов',
    MaxNameLength: 'Не более 50 символов',
    MaxDecriptionLength: 'Не более 500 символов',
    MaxStepDecriptionLength: 'Не более 300 символов',
    CategoriesLength: 'Не менее 3 категорий',
    TimeLimit: 'Только положительное число, не более 10000',
    IngredientsAmount: 'Только положительное число',
} as const;

export const InputNameToPlaceholder: Record<string, string> = {
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'e-mail',
    login: 'Введите логин',
    password: 'Пароль для сайта',
    confirmPassword: 'Повторите пароль',
    title: 'Название рецепта',
    description: 'Краткое описание рецепта',
    categoriesIds: 'Категория рецепта',
    portions: '0',
    time: '0',
    ingredientName: 'Ингредиент',
    ingredientAmount: '100',
    stepDescription: 'Шаг',
};

export const InputNameToLabel: Record<string, string> = {
    firstName: 'Ваше имя',
    lastName: 'Ваша фамилия',
    email: 'Ваш e-mail',
    login: 'Логин для входа на сайт',
    password: 'Пароль',
    confirmPassword: 'Повторите пароль',
    title: '',
    description: '',
    categoriesIds: 'Выберите не менее 3-х тегов',
    portions: 'На сколько человек ваш рецепт?',
    time: 'Сколько времени готовить в минутах?',
};

export const InputNameToHelper: Record<string, string> = {
    login: 'Логин не менее 5 символов, только латиница',
    password: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
};
