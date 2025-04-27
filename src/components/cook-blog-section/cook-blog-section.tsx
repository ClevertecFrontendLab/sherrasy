import { Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { ArrowRightIcon } from '~/assets/icons/icons';
import { Author } from '~/types/author.interface';
import { cookBlog } from '~/utils/data/mock-cards.json';

import CookBlogCard from '../cards/user-cards/cook-blog-card';

function CookBlogSection() {
    return (
        <Flex
            bg='lime.300'
            direction='column'
            mt={{ base: 8, lg: '2.75rem' }}
            gap={{ base: 2, xs: 3, sm: 2.5, md: 3, lg: 5, '2xl': 8 }}
            borderRadius='2xl'
            p={{ base: 3, lg: '22px' }}
            ml={{ base: 4, sm: 5, lg: '284px' }}
            mr={{ base: 8, sm: 5, lg: '278px' }}
            position='relative'
        >
            <Heading
                fontWeight='500'
                fontSize={{ base: '2xl', lg: '3xl', xl: '4xl' }}
                lineHeight={{ base: 8, lg: 9, '2xl': 10 }}
            >
                Кулинарные блоги
            </Heading>
            <SimpleGrid
                spacing={{ base: 3, lg: 4 }}
                templateColumns={{
                    base: '1',
                    sm: 'repeat(3, 1fr)',
                    lg: 'repeat(3, minmax(16.625rem, 1fr))',
                    '2xl': 'repeat(3, minmax(26.625rem, 1fr))',
                }}
            >
                {cookBlog.map((item: Author) => (
                    <CookBlogCard key={item.id} author={item} />
                ))}
            </SimpleGrid>
            <Button
                variant='ghost'
                size={{ base: 'md', '2xl': 'lg' }}
                alignSelf='center'
                rightIcon={<ArrowRightIcon />}
                position={{ lg: 'absolute' }}
                right={{ lg: 5 }}
                mt={{ base: 0.5, xs: 0 }}
            >
                <Text fontWeight={600}>Все авторы </Text>
            </Button>
        </Flex>
    );
}
export default CookBlogSection;
