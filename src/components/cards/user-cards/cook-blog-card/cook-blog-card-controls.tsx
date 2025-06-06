import { Badge, Button, ButtonGroup, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router';

import { BookmarkIcon, PeopleIconOutline, SubscribeIcon } from '~/assets/icons/icons';
import { Blogger } from '~/types/blogger.type';
import { AppRoute } from '~/utils/constant';
import { getRecipeText } from '~/utils/helpers/helpers';

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
    <HStack mb={{ base: 3, '2xl': 0 }}>
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

const FavoriteControls = ({ author }: CookBlogCardControlsProps) => (
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
            >
                Рецепты
            </Button>
            <Button
                variant='outline'
                colorScheme='lime'
                size='xs'
                as={Link}
                to={`/blogs/${author._id}#notes`}
                fontSize={14}
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
        >
            <Text> {getRecipeText(author.newRecipesCount)}</Text>
        </Badge>
    </>
);

const OtherControls = ({ author }: CookBlogCardControlsProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscription = (_id: string) => {
        setIsLoading((prev) => !prev);
    };
    return (
        <>
            <ButtonGroup>
                <Button
                    variant='solid'
                    colorScheme='black'
                    color='white'
                    bgColor='black'
                    borderColor='black'
                    size='xs'
                    leftIcon={<SubscribeIcon />}
                    onClick={() => handleSubscription(author._id)}
                    isLoading={isLoading}
                >
                    Подписаться
                </Button>
                <Button
                    variant='outline'
                    colorScheme='lime'
                    size='xs'
                    as={Link}
                    to={`/blogs/${author._id}#notes`}
                >
                    Читать
                </Button>
            </ButtonGroup>
            <BloggerStats
                subscribersCount={author.subscribersCount}
                bookmarksCount={author.bookmarksCount}
            />
        </>
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
