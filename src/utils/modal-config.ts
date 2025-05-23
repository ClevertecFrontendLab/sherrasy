import loginErrorImage from '~/assets/images/modal/login-error.svg';
import passwordRecoverImage from '~/assets/images/modal/password-recover.svg';
import verificationImage from '~/assets/images/modal/verification.svg';
import verificationErrorImage from '~/assets/images/modal/verification-error.svg';
import { ModalConfig, ModalType } from '~/types/modal.type';

export const MODAL_CONFIGS: Record<ModalType, ModalConfig> = {
    login: {
        bodyText: ['Что-то пошло не так.', 'Попробуйте еще раз'],
        header: 'Вход не выполнен',
        icon: loginErrorImage,
        type: 'login',
    },
    verification: {
        bodyText: ['Мы отправили вам на почту', 'email', 'ссылку для верификации.'],
        footerText: 'Не пришло письмо? Проверьте папку Спам. \n По другим вопросам свяжитесь',
        header: 'Остался последний шаг. Нужно верифицировать ваш e-mail ',
        icon: verificationImage,
        type: 'verification',
    },
    verificationError: {
        bodyText: [
            'Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться снова.',
        ],
        footerText: 'Остались вопросы? Свяжитесь',
        header: 'Упс! Что-то пошло не так',
        icon: verificationErrorImage,
        type: 'verificationError',
    },
    recoveryEmail: {
        bodyText: [
            'Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код',
        ],
        header: '',
        icon: loginErrorImage,
        type: 'recoveryEmail',
    },
    recoveryPin: {
        footerText: 'Не пришло письмо? Проверьте папку Спам.',
        header: '',
        icon: passwordRecoverImage,
        type: 'recoveryPin',
    },
    recoveryForm: {
        header: 'Восстановление аккаунта',
        type: 'recoveryForm',
    },
};
