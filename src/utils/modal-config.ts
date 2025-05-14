import { ModalConfig, ModalType } from '~/types/modal.type';

export const MODAL_CONFIGS: Record<ModalType, ModalConfig> = {
    login: {
        bodyText: ['Что-то пошло не так.', 'Попробуйте еще раз'],
        header: 'Вход не выполнен',
        icon: '/login-error.svg',
        type: 'login',
    },
    verification: {
        bodyText: ['Мы отправили вам на почту', 'ссылку для верификации.'],
        footerText: 'Не пришло письмо? Проверьте папку Спам. \n По другим вопросам свяжитесь',
        header: 'Остался последний шаг. Нужно верифицировать ваш e-mail ',
        icon: '/verification.svg',
        type: 'verification',
    },
    verificationError: {
        bodyText: [
            'Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться снова.',
        ],
        footerText: 'Остались вопросы? Свяжитесь',
        header: 'Упс! Что-то пошло не так',
        icon: '/verification-error.svg',
        type: 'verificationError',
    },
    recoveryEmail: {
        bodyText: [
            'Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код',
        ],
        header: '',
        icon: '/login-error.svg',
        type: 'recoveryEmail',
    },
    recoveryPin: {
        bodyText: ['Мы отправили вам на e-mail', 'шестизначный код. Введите его ниже.'],
        footerText: 'Не пришло письмо? Проверьте папку Спам.',
        header: '',
        icon: '/password-recover.svg',
        type: 'recoveryPin',
    },
    recoveryForm: {
        header: 'Восстановление аккаунта',
        type: 'recoveryForm',
    },
};
