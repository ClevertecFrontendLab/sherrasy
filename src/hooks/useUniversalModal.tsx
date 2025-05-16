import { useState } from 'react';

import { RecoveryEmailForm } from '~/components/forms/recovery-email';
import { RecoveryForm } from '~/components/forms/recovery-form';
import { PinCodeInput } from '~/components/inputs/pincode-input/pincode-input';
import { ModalConfig, ModalType } from '~/types/modal.type';
import { MODAL_CONFIGS } from '~/utils/modal-config';

export const renderModalFlow = (
    type: ModalType | undefined,
    handlers: {
        handleRecoverySuccess: () => void;
        handlePinSuccess: () => void;
    },
) => {
    switch (type) {
        case 'recoveryEmail':
            return <RecoveryEmailForm onSuccess={handlers.handleRecoverySuccess} />;
        case 'recoveryPin':
            return <PinCodeInput onSuccess={handlers.handlePinSuccess} />;
        case 'recoveryForm':
            return <RecoveryForm onSuccess={handlers.handleRecoverySuccess} />;
        default:
            return null;
    }
};

export const useUniversalModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState<ModalType | null>(null);
    const [modalProps, setModalProps] = useState<Record<string, unknown>>({});

    const openModal = (type: ModalType, props?: Record<string, unknown>) => {
        setCurrentModal(type);
        setModalProps(props || {});
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setCurrentModal(null);
        setModalProps({});
    };

    const getConfig = (): ModalConfig | null => {
        if (!currentModal) return null;
        return {
            ...MODAL_CONFIGS[currentModal],
            type: currentModal,
        };
    };

    return {
        isOpen,
        openModal,
        closeModal,
        config: getConfig(),
        modalProps,
        currentModal,
    };
};
