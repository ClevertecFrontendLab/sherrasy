import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';

import { LoginLayout } from '~/components/layout/login-layout';
import { UniversalModal } from '~/components/modal/universal-modal';
import { LoginTabs } from '~/components/tabs/login-tabs';
import { useUniversalModal } from '~/hooks/useUniversalModal';
import { useVerificationResult } from '~/hooks/useVerificationResult';

export const SignUpPage = () => {
    const { emailVerified } = useVerificationResult();
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    useEffect(() => {
        if (!emailVerified) openModal('verificationError');
    }, [emailVerified]);

    return (
        <LoginLayout>
            <Flex
                h='468px'
                mt={{ base: '40px', sm: '56px', lg: '80px' }}
                w={{ base: '90%', sm: '60%' }}
            >
                <LoginTabs />
                <UniversalModal isOpen={isOpen} onClose={closeModal} config={config} />
            </Flex>
        </LoginLayout>
    );
};
