import { CreateToastFnReturn } from '@chakra-ui/react';

import { AlertError } from './alert-error';

let activeToastId: number | string | undefined;

export const showAlertToast = (type: 'search' | 'load', toast: CreateToastFnReturn) => {
    if (activeToastId && toast.isActive(activeToastId)) {
        toast.update(activeToastId, {
            render: ({ onClose }) => <AlertError type={type} onClose={onClose} />,
        });
        return;
    }

    activeToastId = toast({
        position: 'bottom',
        duration: null,
        render: ({ onClose }) => <AlertError type={type} onClose={onClose} />,
    });
};
