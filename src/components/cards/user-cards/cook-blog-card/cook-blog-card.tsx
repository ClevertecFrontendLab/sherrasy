import { Avatar, Box, Card, CardBody, CardFooter, CardHeader, Flex, Text } from '@chakra-ui/react';

import { Blogger } from '~/types/blogger.type';
import { getBloggerCardName } from '~/utils/helpers/blogger-author-helpers';
import { TestIdName } from '~/utils/testId-name.enum';

import { CookBlogCardControls } from './cook-blog-card-controls';

type CookCookBlogCardProps = {
    author: Blogger;
    isExtended?: boolean;
    type?: 'favorite' | 'others';
};

export const CookBlogCard = ({ author, isExtended, type }: CookCookBlogCardProps) => {
    const { firstName = '', lastName = '', login: nick = '', notes = [] } = author;
    const name = getBloggerCardName(firstName, lastName);
    const description = notes.length ? notes[0].text : '';
    const isFavorite = type === 'favorite';

    const heightParams = isExtended
        ? ['13rem', null, null, null, '14rem']
        : ['9rem', '9.5rem', '9.25rem', '9.5rem', '10rem', '10rem', '11.5rem'];
    return (
        <Card
            w='100%'
            maxW={{ '2xl': isFavorite ? '40.5rem' : '26.625rem' }}
            minH={heightParams}
            maxH={heightParams}
            position='relative'
            data-test-id={TestIdName.BlogsCard}
        >
            <CardHeader p={{ base: 3.5, xs: 4, '2xl': 6 }}>
                <Flex flex='1' gap={{ base: 2, lg: 4, '2xl': 3.5 }} alignItems='center'>
                    <Avatar size={{ base: 'sm', lg: 'md' }} name={name} />
                    <Box
                        maxW={
                            isFavorite
                                ? { base: 'calc(100% - 123px)', lg: 'calc(100%-140px)' }
                                : { base: '85%', md: '80%', lg: '70%', '2xl': '80%' }
                        }
                    >
                        <Text
                            fontSize={{ base: 'md', lg: 'lg' }}
                            mt={isFavorite && isExtended ? 6 : 0}
                            isTruncated
                            data-test-id={TestIdName.BlogsCardName}
                        >
                            {name}
                        </Text>
                        <Text
                            fontSize={{ base: 'xs', lg: 'sm' }}
                            lineHeight={{ base: 4, lg: 5 }}
                            color='blackAlpha.700'
                            data-test-id={TestIdName.BlogsCardLogin}
                        >
                            @{nick}
                        </Text>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody
                px={{ base: 3.5, xs: 4, '2xl': 6 }}
                pb={isExtended ? 0 : { base: 4, '2xl': 4 }}
                pt={{ base: 0, '2xl': 1 }}
            >
                <Text
                    fontSize='sm'
                    lineHeight={5}
                    noOfLines={3}
                    data-test-id={TestIdName.BlogsCardNotesText}
                >
                    {description}
                </Text>
            </CardBody>
            {isExtended && (
                <CardFooter py={0} justify='space-between' mb={4} mx={{ base: 4, lg: 0 }}>
                    {' '}
                    <CookBlogCardControls author={author} type={type} />
                </CardFooter>
            )}
        </Card>
    );
};
