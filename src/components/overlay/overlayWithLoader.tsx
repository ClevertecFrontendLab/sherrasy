import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import { getAppLoading } from '~/store/app-status/selectors';
import { useAppSelector } from '~/store/hooks';
import { AppRoute } from '~/utils/constant';

import { Loader } from '../loader/loader';

export const OverlayWithLoader = () => {
    const { pathname } = useLocation();
    const isLoading = useAppSelector(getAppLoading);

    const isErrorPage = pathname === AppRoute.NotFound;

    if (!isLoading || isErrorPage) return null;

    return (
        <Modal
            variant='transparent'
            isOpen={isLoading}
            blockScrollOnMount
            isCentered
            onClose={() => {}}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalBody display='flex' alignItems='center' justifyContent='center'>
                    <Loader type='app' />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
