import { Avatar, Box, Card, CardBody, CardFooter, CardHeader, Flex, Text } from '@chakra-ui/react';

import { Blogger } from '~/types/blogger.type';

import { CookBlogCardControls } from './cook-blog-card-controls';

type CookCookBlogCardProps = {
    author: Blogger;
    isExtended?: boolean;
    type?: 'favorite' | 'others';
};

export const CookBlogCard = ({ author, isExtended, type }: CookCookBlogCardProps) => {
    const { firstName, lastName, login: nick, notes } = author;
    const name = `${firstName} ${lastName}`;
    const description = notes.length ? notes[0].text : '';
    const heightParams = isExtended
        ? ['13rem', null, null, null, '14rem']
        : ['9rem', '9.5rem', '9.25rem', '9.5rem', '10rem', '10rem', '11.5rem'];
    return (
        <Card maxW={{ '2xl': '26.625rem' }} minH={heightParams} maxH={heightParams}>
            <CardHeader p={{ base: 3.5, xs: 4, '2xl': 6 }}>
                <Flex flex='1' gap={{ base: 2, lg: 4, '2xl': 3.5 }} alignItems='center'>
                    <Avatar size={{ base: 'sm', lg: 'md' }} name={name} />
                    <Box maxW={{ base: '85%', md: '80%', lg: '70%', '2xl': '80%' }}>
                        <Text fontSize={{ base: 'md', lg: 'lg' }} isTruncated>
                            {name}
                        </Text>
                        <Text
                            fontSize={{ base: 'xs', lg: 'sm' }}
                            lineHeight={{ base: 4, lg: 5 }}
                            color='blackAlpha.700'
                        >
                            @{nick}
                        </Text>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody
                px={{ base: 3.5, xs: 4, '2xl': 6 }}
                pb={{ base: 4, '2xl': 4 }}
                pt={{ base: 0, '2xl': 1 }}
            >
                <Text fontSize='sm' lineHeight={5} noOfLines={3}>
                    {description}
                </Text>
            </CardBody>
            {isExtended && (
                <CardFooter pt={0} justify='space-between'>
                    {' '}
                    <CookBlogCardControls author={author} type={type} />
                </CardFooter>
            )}
        </Card>
    );
};
