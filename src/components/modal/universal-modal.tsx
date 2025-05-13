import {
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

import { useAppSelector } from '~/store/hooks';
import { getUserEmail } from '~/store/user/selectors';
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
    const email = useAppSelector(getUserEmail);
    if (!config) return null;
    const hasSupportLink = config.type.includes('verification');
    const showEmail = config.type === 'verification' || config.type === 'recoveryPin';
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {config.icon && (
                        <Image
                            src={config.icon}
                            alt='modal-icon'
                            w={{ base: '108px', lg: '206px' }}
                            h={{ base: '108px', lg: '206px' }}
                        />
                    )}
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
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
                            {showEmail && (
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
                {config.footerText && (
                    <ModalFooter>
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
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
};
