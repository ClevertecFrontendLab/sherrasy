import { AlertMessage } from '~/types/api-message.type';

export const ALERT_MESSAGES: Record<string, AlertMessage> = {
    serverError: {
        title: 'Ошибка сервера',
        description: 'Попробуйте немного позже',
        type: 'error',
    },
    searchError: {
        title: 'Ошибка сервера',
        description: 'Попробуйте поискать снова попозже',
        type: 'error',
    },
    loginAuthError: {
        title: 'Неверный логин или пароль',
        description: 'Попробуйте снова.',
        type: 'error',
    },
    loginVerificationError: {
        title: 'E-mail не верифицирован',
        description: 'Проверьте почту и перейдите по ссылке',
        type: 'error',
    },
    recoveryEmailError: {
        title: 'Такого e-mail нет',
        description: 'Попробуйте другой e-mail или проверьте правильность его написания',
        type: 'error',
    },
    verificationSuccess: {
        title: 'Верификация прошла успешно',
        description: '',
        type: 'success',
    },
    recoverySuccess: {
        title: 'Восстановление данных успешно',
        description: '',
        type: 'success',
    },
};
