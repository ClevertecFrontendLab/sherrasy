import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';

import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import MenuDishes from '../menu-dishes/menu-dishes';

type BurgerMenuProps = {
    handleMenuOpen: () => void;
};

function BurgerMenu({ handleMenuOpen }: BurgerMenuProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toggleMenu = () => {
        isOpen ? onClose() : onOpen();
        handleMenuOpen();
    };

    return (
        <>
            <Button
                variant='chost'
                onClick={toggleMenu}
                maxW='min-content'
                pr={{ base: isOpen ? 2 : 4 }}
            >
                {isOpen ? <CloseIcon boxSize={3} /> : <HamburgerIcon boxSize={5} />}
            </Button>
            <Modal onClose={toggleMenu} isOpen={isOpen} motionPreset='slideInRight'>
                <ModalOverlay />
                <ModalContent
                    maxW={{ base: '344px' }}
                    h={{ base: 'calc(100vh - 150px)', sm: 'calc(100vh - 156px)' }}
                    position='absolute'
                    right={2}
                    borderTopRadius={0}
                    borderBottomRadius={8}
                >
                    <ModalBody px={5} py={4} overflowY='auto'>
                        <Breadcrumbs />
                        <MenuDishes />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
export default BurgerMenu;
