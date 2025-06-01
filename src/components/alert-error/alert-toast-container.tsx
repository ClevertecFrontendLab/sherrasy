import { CreateToastFnReturn, useToast, UseToastOptions } from '@chakra-ui/react';
import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

import { setAppMessage } from '~/store/app-status/app-slice';
import { getAppMessage, getAppModalOpen } from '~/store/app-status/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { AlertMessage } from '~/types/api-message.type';
import { AppRoute } from '~/utils/constant';

import { AlertError } from './alert-error';

const useToastManager = () => {
    const activeToastId = useRef<string | number | undefined>(undefined);
    const lastDisplayedMessage = useRef<AlertMessage | null>(null);
    const dispatch = useAppDispatch();

    const showAlertToast = useCallback(
        (toast: CreateToastFnReturn, appMessage: AlertMessage | null, isCentered: boolean) => {
            if (!appMessage) {
                if (activeToastId.current && toast.isActive(activeToastId.current)) {
                    toast.close(activeToastId.current);
                }
                activeToastId.current = undefined;
                lastDisplayedMessage.current = null;
                return;
            }

            dispatch(setAppMessage(null));

            const isSameMessage =
                lastDisplayedMessage.current?.description === appMessage.description &&
                lastDisplayedMessage.current?.type === appMessage.type;

            const toastOptions: UseToastOptions = {
                id: appMessage.id || 'app-message-toast',
                position: 'bottom',
                duration: 12000,
                isClosable: true,
                onCloseComplete: () => {
                    activeToastId.current = undefined;
                    lastDisplayedMessage.current = null;
                },
                render: ({ onClose }) => (
                    <AlertError
                        onClose={onClose}
                        messageData={appMessage}
                        isCentered={isCentered}
                    />
                ),
            };

            if (activeToastId.current && toast.isActive(activeToastId.current) && isSameMessage) {
                toast.update(activeToastId.current, toastOptions);
            } else {
                if (activeToastId.current && toast.isActive(activeToastId.current)) {
                    toast.close(activeToastId.current);
                }
                activeToastId.current = toast(toastOptions);
            }
            lastDisplayedMessage.current = appMessage;
        },
        [dispatch],
    );

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
