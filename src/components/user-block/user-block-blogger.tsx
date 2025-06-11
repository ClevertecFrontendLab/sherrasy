import { Avatar, Button, Center, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { BookmarkIcon, PeopleIconOutline, SubscribeIcon } from '~/assets/icons/icons';
import { useSubscribeToBloggerMutation } from '~/query/services/bloggers';
import { BloggerFull } from '~/types/blogger.type';
import { getBloggerCardName, getCurrentUserId } from '~/utils/helpers/blogger-author-helpers';
import { TestIdName } from '~/utils/testId-name.enum';

import { Loader } from '../layout/loader/loader';

type UserBlockBloggerProps = {
    blogger: BloggerFull;
};
export const UserBlockBlogger = ({ blogger }: UserBlockBloggerProps) => {
    const { bloggerInfo, totalBookmarks, totalSubscribers, isFavorite } = blogger;
    const { firstName = '', lastName = '', login: nick = '', _id = '' } = bloggerInfo;
    const fromUserId = getCurrentUserId() ?? '';

    const [isSubbed, setIsSubbed] = useState(isFavorite);
    const name = getBloggerCardName(firstName, lastName);
    const TOOLTIP_TEXT = 'Нажмите, если хотите отписаться';

    const [toggleSubscription, { isLoading }] = useSubscribeToBloggerMutation();

    const handleSubscription = async () => {
        try {
            setIsSubbed((prev) => !prev);

            await toggleSubscription({ fromUserId, toUserId: _id }).unwrap();
        } catch (error) {
            setIsSubbed((prev) => !prev);
            console.error(error);
        }
    };

    return (
        <HStack
            alignItems='center'
            flexDir={{ base: 'column', sm: 'row' }}
            boxShadow='none'
            justifyContent='center'
            gap={6}
            position='relative'
            data-test-id={TestIdName.BloggerUserInfoBox}
        >
            <Avatar name={name} size='2xl' />
            <VStack alignItems='flex-start' w={{ base: '100%', sm: 'fit-content' }} maxW='100%'>
                <Text
                    p={0}
                    fontSize={{ base: 24, md: 48 }}
                    color='black'
                    fontWeight={700}
                    mb={3}
                    lineHeight='148%'
                    textAlign={{ base: 'center', sm: 'left' }}
                    m={{ base: '0 auto', sm: '0' }}
                    wordBreak='break-word'
                    data-test-id={TestIdName.BloggerUserInfoName}
                >
                    {name}
                </Text>
                <Text
                    p={0}
                    fontSize={14}
                    color='blackAlpha.700'
                    margin={{ base: '0 auto', sm: '0' }}
                    data-test-id={TestIdName.BloggerUserInfoLogin}
                >
                    @{nick}
                </Text>
                <HStack p={0} justifyContent='space-between' w='100%'>
                    {isSubbed ? (
                        <Tooltip
                            label={TOOLTIP_TEXT}
                            w='148px'
                            bg='black'
                            sx={{
                                borderRadius: '4px',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '10px',
                                    height: '10px',
                                    backgroundColor: 'black',
                                    transform: 'rotate(45deg)',
                                    left: '60px',
                                    top: '-5px',
                                },
                            }}
                            placement='bottom-end'
                            offset={[50, 10]}
                            data-test-id={TestIdName.BlogTooltip}
                        >
                            <Button
                                variant='outline'
                                colorScheme='black'
                                size='xs'
                                leftIcon={<SubscribeIcon />}
                                onClick={handleSubscription}
                                isLoading={isLoading}
                                data-test-id={TestIdName.BlogToggleUnsubscribe}
                            >
                                Вы подписаны
                            </Button>
                        </Tooltip>
                    ) : (
                        <Button
                            variant='solid'
                            colorScheme='black'
                            size='xs'
                            leftIcon={<SubscribeIcon />}
                            onClick={handleSubscription}
                            isLoading={isLoading}
                            data-test-id={TestIdName.BlogToggleSubscribe}
                        >
                            Подписаться
                        </Button>
                    )}

                    <HStack>
                        <HStack>
                            <HStack gap={1} data-test-id={TestIdName.BloggerFollowersBookmarks}>
                                <BookmarkIcon color='black' boxSize={3} />
                                <Text color='lime.600' fontWeight={600} fontSize={12}>
                                    {totalBookmarks}
                                </Text>
                            </HStack>

                            <HStack
                                alignItems='center'
                                gap={1}
                                data-test-id={TestIdName.BloggerFollowersCount}
                            >
                                <PeopleIconOutline color='black' boxSize={3} />
                                <Text color='lime.600' fontWeight={600} fontSize={12}>
                                    {totalSubscribers}
                                </Text>
                            </HStack>
                        </HStack>
                    </HStack>
                </HStack>
            </VStack>
            {isLoading && (
                <Center position='absolute' data-test-id={TestIdName.LoaderMobile}>
                    <Loader type='search' />
                </Center>
            )}
        </HStack>
    );
};
