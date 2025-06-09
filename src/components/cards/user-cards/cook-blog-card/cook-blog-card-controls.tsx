import { Badge, Button, ButtonGroup, Center, Flex, HStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { BookmarkIcon, PeopleIconOutline, SubscribeIcon } from '~/assets/icons/icons';
import { Loader } from '~/components/layout/loader/loader';
import { useSubscribeToBloggerMutation } from '~/query/services/bloggers';
import { setBloggerName } from '~/store/blogger/blogger-slice';
import { useAppDispatch } from '~/store/hooks';
import { Blogger } from '~/types/blogger.type';
import { AppRoute } from '~/utils/constant';
import { getBloggerCardName, getCurrentUserId } from '~/utils/helpers/blogger-author-helpers';
import { getRecipeText } from '~/utils/helpers/helpers';
import { TestIdName } from '~/utils/testId-name.enum';

type BloggerStatsProps = {
    subscribersCount: number;
    bookmarksCount: number;
};
type CookBlogCardControlsProps = {
    author: Blogger;
};

type CookBlogCardControlsCardProps = CookBlogCardControlsProps & {
    type?: 'favorite' | 'others';
};

const BloggerStats = ({ subscribersCount, bookmarksCount }: BloggerStatsProps) => (
    <HStack mb={{ base: 3, lg: 0 }}>
        <HStack gap={1}>
            <BookmarkIcon color='black' boxSize={3} />
            <Text color='lime.600' fontWeight={600} fontSize={12}>
                {bookmarksCount}
            </Text>
        </HStack>

        <HStack alignItems='center' gap={1}>
            <PeopleIconOutline color='black' boxSize={3} />
            <Text as='span' color='lime.600' fontWeight={600} fontSize={12}>
                {subscribersCount}
            </Text>
        </HStack>
    </HStack>
);

const FavoriteControls = ({ author }: CookBlogCardControlsProps) => {
    const dispatch = useAppDispatch();
    const name = getBloggerCardName(author.firstName, author.lastName);
    const handleClick = () => dispatch(setBloggerName(`${name} (@${author.login})`));

    return (
        <>
            <ButtonGroup>
                <Button
                    variant='solid'
                    colorScheme='lime'
                    color='black'
                    size='xs'
                    as={Link}
                    to={`${AppRoute.CookBlog}/${author._id}`}
                    fontSize={14}
                    data-test-id={TestIdName.BlogsCardRecipesButton}
                >
                    Рецепты
                </Button>
                <Button
                    variant='outline'
                    colorScheme='lime'
                    size='xs'
                    as={Link}
                    to={`${AppRoute.CookBlog}/${author._id}#notes`}
                    onClick={handleClick}
                    fontSize={14}
                    data-test-id={TestIdName.BlogsCardNotesButton}
                >
                    Читать
                </Button>
            </ButtonGroup>
            <BloggerStats
                subscribersCount={author.subscribersCount}
                bookmarksCount={author.bookmarksCount}
            />
            <Badge
                py={0}
                px={{ base: '8px', lg: 2 }}
                variant='time'
                maxW='min-content'
                position='absolute'
                top={2}
                right={2}
                data-test-id={TestIdName.BlogsCardNewRecipesBadge}
            >
                <Text> {getRecipeText(author.newRecipesCount)}</Text>
            </Badge>
        </>
    );
};

const OtherControls = ({ author }: CookBlogCardControlsProps) => {
    const [isSubbed, setIsSubbed] = useState(false);
    const dispatch = useAppDispatch();
    const fromUserId = getCurrentUserId() ?? '';
    const name = getBloggerCardName(author.firstName, author.lastName);
    const handleClick = () => dispatch(setBloggerName(`${name} (@${author.login})`));
    const [toggleSubscription, { isLoading, isSuccess }] = useSubscribeToBloggerMutation();

    const handleSubscription = (toUserId: string) => {
        toggleSubscription({ fromUserId, toUserId });
    };
    useEffect(() => {
        isSuccess && setIsSubbed((prev) => !prev);
    }, [isSuccess]);
    return (
        <Flex
            w='100%'
            flexDir={{ base: 'column-reverse', lg: 'row' }}
            justify={{ base: 'flex-end', lg: 'space-between' }}
            align={{ base: 'flex-end', lg: 'center' }}
        >
            <ButtonGroup>
                <Button
                    variant={isSubbed ? 'outline' : 'solid'}
                    colorScheme='black'
                    size='xs'
                    leftIcon={<SubscribeIcon />}
                    onClick={() => handleSubscription(author._id)}
                    isLoading={isLoading}
                    data-test-id={
                        isSubbed ? TestIdName.BlogToggleUnsubscribe : TestIdName.BlogToggleSubscribe
                    }
                >
                    {isSubbed ? 'Вы подписаны' : 'Подписаться'}
                </Button>
                <Button
                    variant='outline'
                    colorScheme='lime'
                    size='xs'
                    as={Link}
                    to={`${AppRoute.CookBlog}/${author._id}#notes`}
                    onClick={handleClick}
                >
                    Читать
                </Button>
            </ButtonGroup>
            <BloggerStats
                subscribersCount={author.subscribersCount}
                bookmarksCount={author.bookmarksCount}
            />
            {isLoading && (
                <Center
                    position='absolute'
                    left='50%'
                    top='50%'
                    transform='translate(-50%, -50%)'
                    data-test-id={TestIdName.LoaderMobile}
                >
                    <Loader type='search' />
                </Center>
            )}
        </Flex>
    );
};

export const CookBlogCardControls = ({ author, type }: CookBlogCardControlsCardProps) => {
    if (!type) return null;
    return type === 'favorite' ? (
        <FavoriteControls author={author} />
    ) : (
        <OtherControls author={author} />
    );
};
