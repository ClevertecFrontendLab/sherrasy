import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Center,
    CloseButton,
    Portal,
    VStack,
} from '@chakra-ui/react';

import { setAppMessage } from '~/store/app-status/app-slice';
import { useAppDispatch } from '~/store/hooks';
import { AlertMessage } from '~/types/api-message.type';
import { TestIdName } from '~/utils/testId-name.enum';

type AlertErrrorProps = {
    onClose: () => void;
    messageData: AlertMessage | null;
    isCentered: boolean;
};

export const AlertError = ({ onClose, messageData, isCentered }: AlertErrrorProps) => {
    const dispatch = useAppDispatch();
    if (!messageData) return null;
    const { type, title, description } = messageData;
    const showDescription = type === 'error' && description;
    const containerWidth = isCentered
        ? { base: '100%', xl: 'min-content' }
        : { base: '100%', lg: '50%' };
    const transformContainer = isCentered ? { xl: 'translateX(40vw)' } : undefined;
    const handleClose = () => {
        dispatch(setAppMessage(null));
        onClose();
    };
    return (
        <Portal>
            <Center
                position='fixed'
                zIndex={1441}
                bottom={{ base: '80px', sm: '100px', lg: '16px', xl: '80px' }}
                width={containerWidth}
                transform={transformContainer}
            >
                <Alert
                    status={type}
                    variant='solid'
                    alignItems='center'
                    justifyContent='start'
                    minH={{ base: '72px' }}
                    maxW={{ base: '328px', lg: '400px' }}
                    width={{ base: '328px', lg: '400px' }}
                    data-test-id={TestIdName.ErrorNotif}
                >
                    <AlertIcon boxSize={6} mr={3} />
                    <VStack alignItems='start' w='max-content'>
                        <AlertTitle
                            fontSize='md'
                            data-test-id={type === 'error' ? TestIdName.ErrorNotificationTitle : ''}
                        >
                            {title}
                        </AlertTitle>
                        {showDescription && (
                            <AlertDescription
                                maxWidth='sm'
                                w='96%'
                                data-test-id={
                                    type === 'error' ? TestIdName.ErrorNotificationDescription : ''
                                }
                            >
                                {description}
                            </AlertDescription>
                        )}
                    </VStack>
                    <CloseButton
                        data-test-id={TestIdName.ErrorNotifClose}
                        alignSelf='flex-start'
                        position='absolute'
                        right={0}
                        top={0}
                        onClick={handleClose}
                    />
                </Alert>
            </Center>
        </Portal>
    );
};
