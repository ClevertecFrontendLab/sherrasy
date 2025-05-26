import { Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { LoginLayout } from '~/components/layout/page-layout/login-layout';
import { UniversalModal } from '~/components/modal/universal-modal';
import { LoginTabs } from '~/components/tabs/login-tabs';
import { renderModalFlow, useUniversalModal } from '~/hooks/useUniversalModal';
import { setAppMessage } from '~/store/app-status/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { getUserEmail } from '~/store/user/selectors';
import { ALERT_MESSAGES } from '~/utils/alert-messages';
import { AppRoute, DEFAULT_VERIFIED, LocalStorageKey } from '~/utils/constant';
import { getFlowTestId } from '~/utils/helpers/helpers';
import {
    getDataFromLocalStorage,
    setDataToLocalStorage,
} from '~/utils/helpers/localstorage-helpers';
import { TestIdName } from '~/utils/testId-name.enum';

export const SignInPage = () => {
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const email = useAppSelector(getUserEmail);
    const emailVerified = getDataFromLocalStorage(LocalStorageKey.VerifiedEmail);
    const handleRecoverySuccess = () => {
        closeModal();
        openModal('recoveryPin', { email });
    };

    const handlePinSuccess = () => {
        closeModal();
        openModal('recoveryForm');
    };

    const handleResetSuccess = () => {
        closeModal();
        navigate(AppRoute.SignIn);
    };

    const testId = getFlowTestId(config?.type) ?? '';
    useEffect(() => {
        if (emailVerified == true) {
            dispatch(setAppMessage(ALERT_MESSAGES.verificationSuccess));
            setDataToLocalStorage(LocalStorageKey.VerifiedEmail, DEFAULT_VERIFIED);
        }
    }, [emailVerified, dispatch]);

    return (
        <LoginLayout>
            <Flex
                direction='column'
                mt={{ base: '40px', sm: '56px', lg: '80px' }}
                w='100%'
                maxW={{ base: '328px', sm: '355px', lg: '451px', xl: '461px' }}
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

                {config?.type && (
                    <UniversalModal
                        isOpen={isOpen}
                        onClose={closeModal}
                        config={config}
                        email={email}
                        testId={testId}
                    >
                        {renderModalFlow(config?.type, {
                            handleRecoverySuccess,
                            handlePinSuccess,
                            handleResetSuccess,
                        })}
                    </UniversalModal>
                )}
            </Flex>
        </LoginLayout>
    );
};
