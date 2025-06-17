import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { ArrowRightIcon } from '~/assets/icons/icons';
import { getCurrentUserId } from '~/utils/helpers/blogger-author-helpers';

export const ProfileOtherActions = () => {
    const currentUserId = getCurrentUserId() ?? '';
    console.log(currentUserId);

    return (
        <VStack w='100%' align='start' textAlign='start' gap={{ base: 6, lg: '2.5rem' }}>
            <VStack align='start'>
                <Heading fontSize={{ base: 'lg', lg: 'xl' }} lineHeight={7}>
                    {' '}
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
                >
                    Удалить мой аккаунт
                </Button>
            </VStack>
        </VStack>
    );
};
