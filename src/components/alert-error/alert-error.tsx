import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    CloseButton,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';

type AlertErrrorProps = {
    type: 'search' | 'load';
};

export const AlertError = ({ type }: AlertErrrorProps) => {
    const description = {
        search: 'Попробуйте поискать снова позже',
        load: 'Попробуйте немного позже',
    };
    const { isOpen, onClose } = useDisclosure();
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
            display={isOpen ? 'block' : 'none'}
            data-test-id='error-notification'
        >
            <AlertIcon boxSize={6} mr={3} />
            <VStack alignItems='start' w='max-content'>
                <AlertTitle fontSize='lg'>Ошибка сервера</AlertTitle>
                <AlertDescription maxWidth='sm'>{description[type]}</AlertDescription>
                <CloseButton
                    data-test-id='close-alert-button'
                    alignSelf='flex-start'
                    position='absolute'
                    right={0}
                    top={0}
                    onClick={onClose}
                />
            </VStack>
        </Alert>
    );
};
