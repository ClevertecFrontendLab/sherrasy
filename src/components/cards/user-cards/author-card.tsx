import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    Flex,
    Text,
} from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';

import { PeopleIconOutline, SubscribeIcon } from '~/assets/icons/icons';
import { Loader } from '~/components/layout/loader/loader';
import { useGetBloggerByIdQuery, useSubscribeToBloggerMutation } from '~/query/services/bloggers';
import {
    checkRecipeAuthor,
    getBloggerCardName,
    getCurrentUserId,
} from '~/utils/helpers/blogger-author-helpers';
import { getCookBlogQueryString } from '~/utils/helpers/get-request-query';
import { TestIdName } from '~/utils/testId-name.enum';

type AuthorCardProps = {
    authorId: string;
};

export const AuthorCard = ({ authorId }: AuthorCardProps) => {
    const currentUserId = getCurrentUserId() ?? '';
    const bloggerQuery = getCookBlogQueryString({ currentUserId });
    const isAuthor = checkRecipeAuthor(authorId);

    const { data: author, isLoading: isAuthorLoading } = useGetBloggerByIdQuery(
        isAuthor ? skipToken : `${authorId}?${bloggerQuery}`,
    );

    const [isSubbed, setIsSubbed] = useState(false);
    const [toggleSubscription, { isLoading: isSubscribing }] = useSubscribeToBloggerMutation();

    const handleSubscription = () => {
        if (!authorId) return;
        toggleSubscription({ fromUserId: currentUserId, toUserId: authorId });
    };

    useEffect(() => {
        if (author?.isFavorite !== undefined) {
            setIsSubbed(author.isFavorite);
        }
    }, [author?.isFavorite]);

    if (isAuthor || !author || !author.bloggerInfo) return null;

    const {
        bloggerInfo: { firstName = '', lastName = '', login: nick = '' } = {},
        totalSubscribers = 0,
    } = author;

    const name = getBloggerCardName(firstName, lastName);

    return (
        <Card
            variant='solid'
            bgColor='lime.400'
            direction='row'
            alignItems='center'
            minW={['19.375rem', '20.5rem', '37.25rem', '37.75rem', '36.125rem', null, '41.75rem']}
            maxW={['19.375rem', '20.5rem', '37.25rem', '37.75rem', '36.125rem', null, '41.75rem']}
            mt={{ base: 6, lg: 10 }}
            ml={{ base: 4, sm: 5 }}
            mr={{ base: 4, sm: 5 }}
            p={{ base: 3, sm: '22px' }}
            position='relative'
        >
            {isAuthorLoading || isSubscribing ? (
                <Center position='absolute' inset={0} data-test-id={TestIdName.LoaderMobile}>
                    <Loader type='search' />
                </Center>
            ) : (
                <>
                    <Avatar size={{ base: 'xl' }} name={name} />
                    <Flex direction='column' minW={{ base: '70%', sm: '82%', xl: '84%' }}>
                        <CardHeader
                            px={{ base: 2, sm: '1.125rem' }}
                            pt={{ base: 2, sm: 0.5 }}
                            pb={{ base: 3.5, sm: 4 }}
                        >
                            <Flex>
                                <Box>
                                    <Text
                                        fontSize={{ base: 'lg', sm: '2xl' }}
                                        fontWeight='bold'
                                        isTruncated
                                    >
                                        {name}
                                    </Text>
                                    <Text fontSize='sm' color='blackAlpha.700'>
                                        @{nick}
                                    </Text>
                                </Box>
                                <Text fontSize='xs' position='absolute' top={0} right={0}>
                                    Автор рецепта
                                </Text>
                            </Flex>
                        </CardHeader>
                        <CardBody
                            py={0}
                            px={{ base: 2, sm: 1 }}
                            display='flex'
                            justifyContent='space-between'
                        >
                            <Button
                                leftIcon={<SubscribeIcon />}
                                colorScheme='black'
                                size='xs'
                                variant={isSubbed ? 'outline' : 'solid'}
                                onClick={handleSubscription}
                                isLoading={isSubscribing}
                                data-test-id={
                                    isSubbed
                                        ? TestIdName.BlogToggleUnsubscribe
                                        : TestIdName.BlogToggleSubscribe
                                }
                            >
                                {isSubbed ? 'Вы подписаны' : 'Подписаться'}
                            </Button>
                            <Button
                                leftIcon={<PeopleIconOutline />}
                                color='lime.600'
                                bg='transparent'
                                size='sm'
                            >
                                {totalSubscribers}
                            </Button>
                        </CardBody>
                    </Flex>
                </>
            )}
        </Card>
    );
};
