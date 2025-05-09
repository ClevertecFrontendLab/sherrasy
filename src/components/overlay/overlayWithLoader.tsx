import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import { AppRoute } from '~/utils/constant';

import { Loader } from '../loader/loader';

export const OverlayWithLoader = ({ isOpen }: { isOpen: boolean }) => {
    const { pathname } = useLocation();

    const isErrorPage = pathname === AppRoute.NotFound;

    if (!isOpen || isErrorPage) return null;

    return (
        <Modal
            variant='transparent'
            isOpen={isOpen}
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
