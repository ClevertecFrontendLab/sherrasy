import { Avatar, Box, Button, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react';

import { PeopleIconOutline, SubscribeIcon } from '~/assets/icons/icons';
import { Author } from '~/types/author.interface';

type AuthorCardProps = {
    author: Author;
};

function AuthorCard({ author }: AuthorCardProps) {
    const { avatar, name, subscribers, nick } = author;
    return (
        <Card
            variant='solid'
            bgColor='lime.400'
            direction='row'
            alignItems='center'
            minW={['19.375rem', '20.5rem', '37.25rem', '37.75rem', '36.125rem', null, '41.75rem']}
            maxW={['19.375rem', '20.5rem', '37.25rem', '37.75rem', '36.125rem', null, '41.75rem']}
            mt={{ base: 6, lg: 10 }}
            ml={{ base: 4, sm: 5, lg: '17.75rem' }}
            mr={{ base: 4, sm: 5, lg: '17.375rem' }}
            p={{ base: 3, sm: '22px' }}
        >
            <Avatar size={{ base: 'xl' }} name={name} src={avatar} />
            <Flex direction='column' minW={{ base: '70%', sm: '82%', xl: '84%' }}>
                <CardHeader
                    px={{ base: 2, sm: '1.125rem' }}
                    pt={{ base: 2, sm: 0.5 }}
                    pb={{ base: 3.5, sm: 4 }}
                    position='relative'
                >
                    <Flex>
                        <Box>
                            <Text
                                fontSize={{ base: 'lg', sm: '2xl' }}
                                lineHeight={{ base: 7, sm: 8 }}
                                fontWeight={{ base: 'semibold', sm: 'bold' }}
                                mb={{ sm: 1 }}
                                isTruncated
                            >
                                {name}
                            </Text>
                            <Text
                                fontSize={{ base: 'sm' }}
                                lineHeight={{ base: 5 }}
                                color='blackAlpha.700'
                            >
                                {nick}
                            </Text>
                        </Box>
                        <Text
                            fontSize={{ base: 'xs', sm: 'sm' }}
                            lineHeight={{ base: 4, sm: 5 }}
                            position='absolute'
                            top={{ base: -1, sm: 0.5 }}
                            right={0}
                        >
                            Автор рецепта
                        </Text>
                    </Flex>
                </CardHeader>
                <CardBody
                    py={0}
                    px={{ base: 2, sm: 1 }}
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Button
                        ml={{ sm: 3.5 }}
                        leftIcon={<SubscribeIcon />}
                        variant='solid'
                        colorScheme='black'
                        bg='black'
                        size='xs'
                    >
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
