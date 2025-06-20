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
import { PropsWithChildren } from 'react';

import { ModalConfig } from '~/types/modal.type';
import { TestIdName } from '~/utils/testId-name.enum';

import { DynamicModalText } from './dynamic-modal-text';

type UniversalModalProps = PropsWithChildren & {
    isOpen: boolean;
    onClose: () => void;
    config: ModalConfig | null;
    email?: string | null;
    testId?: string;
};

export const UniversalModal = ({
    isOpen,
    config,
    children,
    onClose,
    email,
    testId,
}: UniversalModalProps) => {
    if (!config) return null;

    const showEmail = config.type === 'verification' || config.type === 'recoveryPin';
    const hasSupportLink = config.type.includes('verification');
    const isImageModal = config.type === 'imageLoad';
    const isDraftModal = config.type === 'exitRecipe';
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent data-test-id={testId || ''}>
                <ModalHeader p={isImageModal ? 0 : 'initial'}>
                    {config.icon && (
                        <Image
                            src={config.icon}
                            alt='modal-icon'
                            w={{ base: '108px', lg: '206px' }}
                            h={{ base: '108px', lg: '206px' }}
                            mb={isDraftModal ? '22px' : 'initial'}
                        />
                    )}
                    <ModalCloseButton data-test-id={TestIdName.ModalClose} />
                </ModalHeader>
                <ModalBody>
                    {config.header && (
                        <Heading
                            as='h1'
                            fontSize='2xl'
                            lineHeight={8}
                            textAlign='center'
                            mb={isImageModal ? 6 : 4}
                            w='90%'
                        >
                            {config.header}
                        </Heading>
                    )}
                    <DynamicModalText
                        textData={config.bodyText}
                        highlightIndex={1}
                        highlightCondition={showEmail}
                        customText={email || ''}
                    />
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
