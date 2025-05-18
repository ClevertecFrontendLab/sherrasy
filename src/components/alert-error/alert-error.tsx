import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Center,
    CloseButton,
    VStack,
} from '@chakra-ui/react';

import { setAppMessage } from '~/store/app-status/app-slice';
import { useAppDispatch } from '~/store/hooks';
import { AlertMessage } from '~/types/api-message.type';
import { TestIdName } from '~/utils/constant';

type AlertErrrorProps = {
    onClose: () => void;
    messageData: AlertMessage | null;
};

export const AlertError = ({ onClose, messageData }: AlertErrrorProps) => {
    const dispatch = useAppDispatch();
    if (!messageData) return null;
    const { type, title, description } = messageData;
    const showDescription = type === 'error' && description;
    const handleClose = () => {
        dispatch(setAppMessage(null));
        onClose();
    };
    return (
        <Center>
            <Alert
                status={type}
                variant='solid'
                alignItems='center'
                justifyContent='start'
                minH={{ base: '72px' }}
                maxW={{ base: '328px', lg: '400px' }}
                w='100%'
                position='fixed'
                zIndex='overlay'
                bottom={{ base: '100px', lg: '80px' }}
                data-test-id={TestIdName.ErrorNotif}
            >
                <AlertIcon boxSize={6} mr={3} />
                <VStack alignItems='start' w='max-content'>
                    <AlertTitle fontSize='md'>{title}</AlertTitle>
                    {showDescription && (
                        <AlertDescription maxWidth='sm' w='90%'>
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
    );
};
