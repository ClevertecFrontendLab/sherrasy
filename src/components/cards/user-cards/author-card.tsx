import { Avatar, Box, Button, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react';

import { PeopleIconOutline, SubscribeIcon } from '~/assets/icons/icons';
import { Author } from '~/types/author.interface';

type AuthorCardProps = {
    author: Author;
};

function AuthorCard({ author }: AuthorCardProps) {
    const { avatar, name, subscribers, nick } = author;
    return (
        <Card variant='solid' bgColor='lime.400' direction='row' alignItems='center'>
            <Avatar size={{ base: 'md', lg: 'xl' }} name={name} src={avatar} />
            <Flex direction='column'>
                <CardHeader p={{ base: 3.5, xs: 4, '2xl': 6 }}>
                    <Flex flex='1' gap={{ base: 2, lg: 4, '2xl': 3.5 }} alignItems='center'>
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
                        <Text>Автор рецепта</Text>
                    </Flex>
                </CardHeader>
                <CardBody
                    px={{ base: 3.5, xs: 4, '2xl': 6 }}
                    pb={{ base: 4, '2xl': 4 }}
                    pt={{ base: 0, '2xl': 1 }}
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Button
                        leftIcon={<SubscribeIcon />}
                        variant='solid'
                        colorScheme='black'
                        bg='black'
                    >
                        {' '}
                        Подписаться
                    </Button>
                    <Button
                        leftIcon={<PeopleIconOutline color='black' boxSize={{ base: 3 }} />}
                        color='lime.600'
                        bg='transparent'
                        p={0}
                        size='sm'
                        fontSize='xs'
                        lineHeight={4}
                        iconSpacing='0.375rem'
                        h='100%'
                    >
                        {subscribers}
                    </Button>
                </CardBody>
            </Flex>
        </Card>
    );
}

export default AuthorCard;
