import { Avatar, Button, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';

import { BookmarkIcon, PeopleIconOutline, SubscribeIcon } from '~/assets/icons/icons';
import { BloggerFull } from '~/types/blogger.type';

import { Loader } from '../layout/loader/loader';

type UserBlockBloggerProps = {
    blogger: BloggerFull;
};
export const UserBlockBlogger = ({ blogger }: UserBlockBloggerProps) => {
    const { bloggerInfo, totalBookmarks, totalSubscribers, isFavorite } = blogger;
    const { firstName, lastName, login: nick } = bloggerInfo;
    const name = `${firstName} ${lastName}`;
    const isLoading = false;
    const TOOLTIP_TEXT = 'Нажмите, если хотите отписаться';
    const toggleSubscription = () => console.log('clicked');
    return (
        <HStack
            alignItems='center'
            flexDir={{ base: 'column', sm: 'row' }}
            boxShadow='none'
            justifyContent='center'
            gap={6}
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
                >
                    {name}
                </Text>
                <Text
                    p={0}
                    fontSize={14}
                    color='blackAlpha.700'
                    margin={{ base: '0 auto', sm: '0' }}
                >
                    @{nick}
                </Text>
                <HStack p={0} justifyContent='space-between' w='100%'>
                    {isFavorite ? (
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
                        >
                            <Button
                                variant='outline'
                                colorScheme='black'
                                color='blackAlpha.800'
                                bgColor='white'
                                borderColor='blackAlpha.600'
                                size='xs'
                                leftIcon={<SubscribeIcon />}
                                onClick={toggleSubscription}
                                isLoading={isLoading}
                            >
                                Вы подписаны
                            </Button>
                        </Tooltip>
                    ) : (
                        <Button
                            variant='outline'
                            colorScheme='black'
                            color='white'
                            bgColor='black'
                            borderColor='black'
                            size='xs'
                            leftIcon={<SubscribeIcon />}
                            onClick={toggleSubscription}
                            isLoading={isLoading}
                        >
                            Подписаться
                        </Button>
                    )}

                    <HStack>
                        <HStack>
                            <HStack gap={1}>
                                <BookmarkIcon color='black' boxSize={3} />
                                <Text color='lime.600' fontWeight={600} fontSize={12}>
                                    {totalBookmarks}
                                </Text>
                            </HStack>

                            <HStack alignItems='center' gap={1}>
                                <PeopleIconOutline color='black' boxSize={3} />
                                <Text color='lime.600' fontWeight={600} fontSize={12}>
                                    {totalSubscribers}
                                </Text>
                            </HStack>
                        </HStack>
                    </HStack>
                </HStack>
            </VStack>
            {isLoading && <Loader type='search' />}
        </HStack>
    );
};
