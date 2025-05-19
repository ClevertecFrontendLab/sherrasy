import { CreateToastFnReturn, useToast, UseToastOptions } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

import { setAppMessage } from '~/store/app-status/app-slice';
import { getAppMessage, getAppModalOpen } from '~/store/app-status/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { AlertMessage } from '~/types/api-message.type';
import { AppRoute } from '~/utils/constant';

import { AlertError } from './alert-error';

const useToastManager = () => {
    const activeToastId = useRef<string | number | undefined>('');
    const dispatch = useAppDispatch();

    const showAlertToast = (
        toast: CreateToastFnReturn,
        appMessage: AlertMessage | null,
        isCentered: boolean,
    ) => {
        const toastOptions: UseToastOptions = {
            position: 'bottom',
            duration: 15000,
            onCloseComplete: () => dispatch(setAppMessage(null)),
            render: ({ onClose }) => (
                <AlertError onClose={onClose} messageData={appMessage} isCentered={isCentered} />
            ),
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
    const isModalOpened = useAppSelector(getAppModalOpen);
    const toast = useToast();
    const { showAlertToast } = useToastManager();
    const { pathname } = useLocation();
    const isEntryPage = pathname === AppRoute.SignIn || pathname === AppRoute.SignUp;
    const isCentered = !isEntryPage || isModalOpened;
    useEffect(() => {
        if (appMessage) {
            showAlertToast(toast, appMessage, isCentered);
        }
    }, [appMessage, toast, isCentered, showAlertToast]);

    return null;
};
