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

import { ModalConfig } from '~/types/modal.type';
import { TestIdName } from '~/utils/constant';

type UniversalModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    config: ModalConfig | null;
    email?: string | null;
    testId?: string;
};

export const UniversalModal = ({
    isOpen,
    config,
    children,
    onClose,
    email = '',
    testId = '',
}: UniversalModalProps) => {
    if (!config) return null;

    const showEmail = config.type === 'verification' || config.type === 'recoveryPin';
    const hasSupportLink = config.type.includes('verification');

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
                    <ModalCloseButton data-test-id={TestIdName.ModalClose} />
                </ModalHeader>
                <ModalBody data-test-id={testId}>
                    {config.header && (
                        <Heading as='h1' fontSize='2xl' lineHeight={8} textAlign='center' mb={4}>
                            {config.header}
                        </Heading>
                    )}

                    {config.bodyText?.map((text, index) => (
                        <Text
                            key={index}
                            color={index === 1 && showEmail ? 'blackAlpha.900' : 'blackAlpha.700'}
                            textAlign='center'
                            fontSize='md'
                            lineHeight={6}
                            fontWeight={index === 1 && showEmail ? 'bold' : 'normal'}
                        >
                            {index === 1 && showEmail ? email : text}
                        </Text>
                    ))}

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
