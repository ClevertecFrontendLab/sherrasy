import { CreateToastFnReturn, useToast, UseToastOptions } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { getAppMessage } from '~/store/app-status/selectors';
import { useAppSelector } from '~/store/hooks';

import { AlertError } from './alert-error';

const useToastManager = () => {
    const activeToastId = useRef<string | number | undefined>('');
    const lastApiMessage = useAppSelector(getAppMessage);

    const showAlertToast = (toast: CreateToastFnReturn) => {
        const toastOptions: UseToastOptions = {
            position: 'bottom',
            duration: null,
            render: ({ onClose }) => <AlertError onClose={onClose} messageData={lastApiMessage} />,
        };

        if (activeToastId.current && toast.isActive(activeToastId.current)) {
            toast.update(activeToastId.current, toastOptions);
        } else {
            activeToastId.current = toast(toastOptions);
        }
    };

    return { showAlertToast };
};

export const AlertToastContainer = () => {
    const appMessage = useAppSelector(getAppMessage);
    const toast = useToast();
    const { showAlertToast } = useToastManager();

    useEffect(() => {
        if (appMessage) {
            showAlertToast(toast);
        }
    }, [appMessage, toast, showAlertToast]);

    return null;
};
