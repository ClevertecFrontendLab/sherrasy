import { Button, Flex } from '@chakra-ui/react';

import { LoginLayout } from '~/components/layout/login-layout';
import { UniversalModal } from '~/components/modal/universal-modal';
import { LoginTabs } from '~/components/tabs/login-tabs';
import { useUniversalModal } from '~/hooks/useUniversalModal';

export const SignInPage = () => {
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const handleRecoverClick = () => openModal('recoveryEmail');
    return (
        <LoginLayout>
            <Flex
                direction='column'
                mt={{ base: '40px', sm: '56px', lg: '80px' }}
                w={{ base: '90%', sm: '60%' }}
            >
                <LoginTabs />
                <Button mt={4} variant='chost' onClick={handleRecoverClick}>
                    Забыли логин или пароль?
                </Button>
                <UniversalModal isOpen={isOpen} onClose={closeModal} config={config} />
            </Flex>
        </LoginLayout>
    );
};
