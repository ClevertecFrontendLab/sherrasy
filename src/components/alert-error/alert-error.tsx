import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    CloseButton,
    VStack,
} from '@chakra-ui/react';

type AlertErrrorProps = {
    type: 'search' | 'load';
    onClose: () => void;
};

export const AlertError = ({ type, onClose }: AlertErrrorProps) => {
    const description = {
        search: 'Попробуйте поискать снова позже',
        load: 'Попробуйте немного позже',
    };
    return (
        <Alert
            status='error'
            variant='solid'
            alignItems='center'
            justifyContent='start'
            minH={{ base: '72px' }}
            maxW={{ base: '328px', lg: '400px' }}
            w='100%'
            position='fixed'
            left='37%'
            bottom={{ base: '100px', lg: '80px' }}
            data-test-id='error-notification'
        >
            <AlertIcon boxSize={6} mr={3} />
            <VStack alignItems='start' w='max-content'>
                <AlertTitle fontSize='lg'>Ошибка сервера</AlertTitle>
                <AlertDescription maxWidth='sm'>{description[type]}</AlertDescription>
            </VStack>
            <CloseButton
                data-test-id='close-alert-button'
                alignSelf='flex-start'
                position='absolute'
                right={0}
                top={0}
                onClick={onClose}
            />
        </Alert>
    );
};
