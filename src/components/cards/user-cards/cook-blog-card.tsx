import { Avatar, Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react';

import { Author } from '~/types/author.interface';

type CookCookBlogCardProps = {
    author: Author;
};

export const CookBlogCard = ({ author }: CookCookBlogCardProps) => {
    const { avatar, name, description, nick } = author;
    return (
        <Card
            minH={{
                base: '9rem',
                xs: '9.5rem',
                sm: '9.25rem',
                md: '9.5rem',
                lg: '10rem',
                '2xl': '11.5rem',
            }}
            maxH={{
                base: '9rem',
                xs: '9.5rem',
                sm: '9.25rem',
                md: '9.5rem',
                lg: '10rem',
                '2xl': '11.5rem',
            }}
        >
            <CardHeader p={{ base: 3.5, xs: 4, '2xl': 6 }}>
                <Flex flex='1' gap={{ base: 2, lg: 4, '2xl': 3.5 }} alignItems='center'>
                    <Avatar size={{ base: 'sm', lg: 'md' }} name={name} src={avatar} />
                    <Box maxW={{ base: '85%', md: '80%', lg: '70%', '2xl': '80%' }}>
                        <Text fontSize={{ base: 'md', lg: 'lg' }} isTruncated>
                            {name}
                        </Text>
                        <Text
                            fontSize={{ base: 'xs', lg: 'sm' }}
                            lineHeight={{ base: 4, lg: 5 }}
                            color='blackAlpha.700'
                        >
                            {nick}
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
        </Card>
    );
};
