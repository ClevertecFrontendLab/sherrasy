import { AlertMessage } from '~/types/api-message.type';

export const ALERT_MESSAGES: Record<string, AlertMessage> = {
    serverError: {
        id: 'serverError',
        title: 'Ошибка сервера',
        description: 'Попробуйте немного позже.',
        type: 'error',
    },
    searchError: {
        id: 'searchError',
        title: 'Ошибка сервера',
        description: 'Попробуйте поискать снова попозже',
        type: 'error',
    },
    publishRecipeNameError: {
        id: 'publishRecipeNameError',

        title: 'Ошибка ',
        description: 'Рецепт с таким названием уже существует',
        type: 'error',
    },
    publishRecipeError: {
        id: 'publishRecipeError',

        title: 'Ошибка сервера',
        description: 'Попробуйте пока сохранить в черновик',
        type: 'error',
    },
    removeRecipeError: {
        id: 'removeRecipeError',
        title: 'Ошибка сервера',
        description: 'Не удалось удалить рецепт',
        type: 'error',
    },
    publishDraftError: {
        id: 'publishDraftError',
        title: 'Ошибка сервера',
        description: 'Не удалось сохранить черновик рецепта',
        type: 'error',
    },
    loginAuthError: {
        id: 'loginAuthError',
        title: 'Неверный логин или пароль',
        description: 'Попробуйте снова.',
        type: 'error',
    },
    loginVerificationError: {
        id: 'loginVerificationError',
        title: 'E-mail не верифицирован',
        description: 'Проверьте почту и перейдите по ссылке',
        type: 'error',
    },
    recoveryEmailError: {
        id: 'recoveryEmailError',
        title: 'Такого e-mail нет',
        description: 'Попробуйте другой e-mail или проверьте правильность его написания',
        type: 'error',
    },
    verificationSuccess: {
        id: 'verificationSuccess',
        title: 'Верификация прошла успешно',
        description: '',
        type: 'success',
    },
    recoverySuccess: {
        id: 'recoverySuccess',
        title: 'Восстановление данных успешно',
        description: '',
        type: 'success',
    },
    publishRecipeSuccess: {
        id: 'publishRecipeSuccess',
        title: 'Рецепт успешно опубликован',
        description: '',
        type: 'success',
    },
    removeRecipeSuccess: {
        id: 'removeRecipeSuccess',
        title: 'Рецепт успешно удален',
        description: '',
        type: 'success',
    },
    publishDraftSuccess: {
        id: 'publishDraftSuccess',
        title: 'Черновик успешно сохранен',
        description: '',
        type: 'success',
    },
};
