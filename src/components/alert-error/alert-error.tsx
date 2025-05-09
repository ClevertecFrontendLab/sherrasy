import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    CloseButton,
    VStack,
} from '@chakra-ui/react';

import { TestIdName } from '~/utils/constant';

type AlertErrrorProps = {
    onClose: () => void;
};

export const AlertError = ({ onClose }: AlertErrrorProps) => (
    <Alert
        status='error'
        variant='solid'
        alignItems='center'
        justifyContent='start'
        minH={{ base: '72px' }}
        maxW={{ base: '328px', lg: '400px' }}
        w='100%'
        position='fixed'
        bottom={{ base: '100px', lg: '80px' }}
        data-test-id={TestIdName.ErrorNotif}
    >
        <AlertIcon boxSize={6} mr={3} />
        <VStack alignItems='start' w='max-content'>
            <AlertTitle fontSize='lg'>Ошибка сервера</AlertTitle>
            <AlertDescription maxWidth='sm'>Попробуйте поискать снова попозже</AlertDescription>
        </VStack>
        <CloseButton
            data-test-id={TestIdName.ErrorNotifClose}
            alignSelf='flex-start'
            position='absolute'
            right={0}
            top={0}
            onClick={onClose}
        />
    </Alert>
);
