import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';

import { LoginLayout } from '~/components/layout/login-layout';
import { UniversalModal } from '~/components/modal/universal-modal';
import { LoginTabs } from '~/components/tabs/login-tabs';
import { useUniversalModal } from '~/hooks/useUniversalModal';
import { useVerificationResult } from '~/hooks/useVerificationResult';
import { TestIdName } from '~/utils/testId-name.enum';

export const SignUpPage = () => {
    const { isVerificationFailed } = useVerificationResult();
    const { isOpen, openModal, closeModal, config } = useUniversalModal();

    useEffect(() => {
        if (isVerificationFailed && !isOpen) {
            openModal('verificationError');
        }
    }, [openModal, isOpen, isVerificationFailed]);

    return (
        <LoginLayout>
            <Flex
                h='468px'
                mt={{ base: '40px', sm: '56px', lg: '80px' }}
                w='100%'
                maxW={{ base: '328px', sm: '355px', lg: '451px', xl: '461px' }}
            >
                <LoginTabs />
                <UniversalModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    config={config}
                    testId={TestIdName.ModalEmailVerificationFailed}
                />
            </Flex>
        </LoginLayout>
    );
};
