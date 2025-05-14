import { Button, Flex } from '@chakra-ui/react';

import { RecoveryEmailForm } from '~/components/forms/recovery-email';
import { RecoveryForm } from '~/components/forms/recovery-form';
import { PinCodeInput } from '~/components/inputs/pincode-input/pincode-input';
import { LoginLayout } from '~/components/layout/login-layout';
import { UniversalModal } from '~/components/modal/universal-modal';
import { LoginTabs } from '~/components/tabs/login-tabs';
import { useUniversalModal } from '~/hooks/useUniversalModal';
import { useAppSelector } from '~/store/hooks';
import { getUserEmail } from '~/store/user/selectors';
import { TestIdName } from '~/utils/constant';

export const SignInPage = () => {
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const email = useAppSelector(getUserEmail);

    const handleRecoverySuccess = () => {
        closeModal();
        openModal('recoveryPin', { email });
    };

    const handlePinSuccess = () => {
        closeModal();
        openModal('recoveryForm');
    };

    return (
        <LoginLayout>
            <Flex
                direction='column'
                mt={{ base: '40px', sm: '56px', lg: '80px' }}
                w={{ base: '90%', sm: '60%' }}
            >
                <LoginTabs />
                <Button
                    data-test-id={TestIdName.ForgotPassword}
                    mt={4}
                    variant='ghost'
                    onClick={() => openModal('recoveryEmail')}
                >
                    Забыли логин или пароль?
                </Button>

                <UniversalModal isOpen={isOpen} onClose={closeModal} config={config} email={email}>
                    {config?.type === 'recoveryEmail' && (
                        <RecoveryEmailForm onSuccess={handleRecoverySuccess} />
                    )}
                    {config?.type === 'recoveryPin' && (
                        <PinCodeInput onSuccess={handlePinSuccess} />
                    )}
                    {config?.type === 'recoveryForm' && (
                        <RecoveryForm
                            onSuccess={() => {
                                closeModal();
                            }}
                        />
                    )}
                </UniversalModal>
            </Flex>
        </LoginLayout>
    );
};
