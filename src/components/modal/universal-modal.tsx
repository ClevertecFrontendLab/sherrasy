import {
    Button,
    Heading,
    Image,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import { ModalConfig } from '~/types/modal.type';

export const UniversalModal = ({
    isOpen,
    config,
    children,
    onClose = () => {},
}: {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    config: ModalConfig | null;
}) => {
    if (!config) return null;
    const hasSupportLink = config.type.includes('verification');
    const email = 'email';
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent p={6} alignItems='center' w={{ base: '316px', lg: '396px' }}>
                <ModalHeader pt={0} display='flex' flexDir='column' alignItems='center'>
                    {config.icon && (
                        <Image
                            src={config.icon}
                            alt='modal-icon'
                            w={{ base: '108px', lg: '206px' }}
                            h={{ base: '108px', lg: '206px' }}
                        />
                    )}
                    <ModalCloseButton
                        width='24px'
                        height='24px'
                        border='1px solid black'
                        borderRadius='50%'
                        top={6}
                        right={6}
                    ></ModalCloseButton>
                </ModalHeader>
                <ModalBody px={0} display='flex' flexDir='column' alignItems='center'>
                    {config.header && (
                        <Heading as='h1' fontSize='2xl' lineHeight={8} textAlign='center' mb={4}>
                            {config.header}
                        </Heading>
                    )}
                    {config.bodyText && (
                        <>
                            <Text
                                color='blackAlpha.700'
                                textAlign='center'
                                fontSize='md'
                                lineHeight={6}
                            >
                                {config.bodyText[0]}
                            </Text>
                            {email && (
                                <Text
                                    color='blackAlpha.900'
                                    textAlign='center'
                                    fontSize='md'
                                    lineHeight={6}
                                    fontWeight='bold'
                                >
                                    {email}
                                </Text>
                            )}
                            <Text
                                color='blackAlpha.700'
                                textAlign='center'
                                fontSize='md'
                                lineHeight={6}
                            >
                                {config.bodyText[1]}
                            </Text>
                        </>
                    )}
                    {children}
                </ModalBody>
                <ModalFooter w='100%' mt={4}>
                    {config.btnText && (
                        <Button colorScheme='black' bgColor='black' w='100%'>
                            {config.btnText}
                        </Button>
                    )}
                    {config.footerText && (
                        <Text
                            color='blackAlpha.600'
                            textAlign='center'
                            fontSize='xs'
                            lineHeight={4}
                            whiteSpace='pre-wrap'
                        >
                            {config.footerText}{' '}
                            {hasSupportLink && <Link textDecor='underline'>с поддержкой</Link>}
                        </Text>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
