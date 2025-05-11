import { useState } from 'react';

import { ModalConfig } from '~/types/modal.type';

const MODAL_CONFIGS: Record<string, ModalConfig> = {
    login: {
        bodyText: ['Что-то пошло не так.', 'Попробуйте еще раз'],
        btnText: 'Повторить',
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
        btnText: 'Получить код',
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
        btnText: 'Зарегистрироваться',
        header: 'Восстановление аккаунта',
        type: 'recoveryForm',
    },
};

export const useUniversalModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<keyof typeof MODAL_CONFIGS | null>(null);

    const openModal = (type: keyof typeof MODAL_CONFIGS) => {
        setModalType(type);
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    return {
        isOpen,
        openModal,
        closeModal,
        config: modalType ? MODAL_CONFIGS[modalType] : null,
    };
};
