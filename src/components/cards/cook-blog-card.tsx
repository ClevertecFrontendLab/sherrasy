import { Avatar, Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react';

import { Author } from '~/types/author.interface';

type CookCookBlogCardProps = {
    author: Author;
};

function CookBlogCard({ author }: CookCookBlogCardProps) {
    const { avatar, name, description, nick } = author;
    return (
        <Card
            minH={{ base: '9.5rem', lg: '10rem', '2xl': '11.5rem' }}
            maxH={{ base: '9.5rem', lg: '10rem', '2xl': '11.5rem' }}
        >
            <CardHeader p={{ base: 4, '2xl': 6 }}>
                <Flex flex='1' gap={{ base: 2, '2xl': 3 }} alignItems='center'>
                    <Avatar size={{ base: 'sm', lg: 'md' }} name={name} src={avatar} />
                    <Box maxW='85%'>
                        <Text size={{ base: 'sm', lg: 'lg' }} isTruncated>
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
            <CardBody p={{ base: 4, '2xl': 6 }} pt={0}>
                <Text
                    noOfLines={3}
                    fontSize={{ base: 'xs', lg: 'sm' }}
                    lineHeight={5}
                    letterSpacing={1.1}
                >
                    {description}
                </Text>
            </CardBody>
        </Card>
    );
}
export default CookBlogCard;
