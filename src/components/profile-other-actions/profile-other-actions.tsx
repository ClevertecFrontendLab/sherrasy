import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Link } from 'react-router';

import { ArrowRightIcon } from '~/assets/icons/icons';
import { useUniversalModal } from '~/hooks/useUniversalModal';
import { getCurrentUserId } from '~/utils/helpers/blogger-author-helpers';

import { UniversalModal } from '../modal/universal-modal';

export const ProfileOtherActions = () => {
    const currentUserId = getCurrentUserId() ?? '';
    const { isOpen, openModal, closeModal, config } = useUniversalModal();
    const handleOpenModal = useCallback(() => {
        openModal('deleteProfile');
    }, []);

    const handleDeleteProfile = () => console.log(currentUserId);
    return (
        <VStack w='100%' align='start' textAlign='start' gap={{ base: 6, lg: '2.5rem' }}>
            <VStack align='start'>
                <Heading fontSize={{ base: 'lg', lg: 'xl' }} lineHeight={7}>
                    О проекте
                </Heading>
                <HStack>
                    <Button
                        variant='ghost'
                        as={Link}
                        to='https://clevertec.ru/'
                        target='_blank'
                        rel='noopener noreferrer'
                        rightIcon={<ArrowRightIcon />}
                        fontSize='md'
                        fontWeight='md'
                        lineHeight={6}
                        whiteSpace='pre-wrap'
                        p={0}
                    >
                        {`Связаться с `}
                        <Text as='span' textDecoration='underline' display='inline'>
                            разработчиками
                        </Text>
                    </Button>
                </HStack>
            </VStack>
            <VStack align='start'>
                <Heading fontSize={{ base: 'lg', lg: 'xl' }} lineHeight={7}>
                    Удаление аккаунта аккаунт
                </Heading>
                <Button
                    variant='ghost'
                    rightIcon={<ArrowRightIcon />}
                    fontSize='md'
                    lineHeight={6}
                    fontWeight='md'
                    p={0}
                    onClick={handleOpenModal}
                >
                    Удалить мой аккаунт
                </Button>
            </VStack>
            <UniversalModal isOpen={isOpen} onClose={closeModal} config={config}>
                <Button mt={8} colorScheme='black' w='100%' onClick={handleDeleteProfile}>
                    Удалить мой аккаунт
                </Button>
            </UniversalModal>
        </VStack>
    );
};
