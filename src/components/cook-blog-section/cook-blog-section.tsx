import { Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { ArrowRightIcon } from '~/assets/icons/icons';
import { cookBlog } from '~/components/cards/mock-cards.json';
import { Author } from '~/types/author.interface';

import CookBlogCard from '../cards/cook-blog-card';

function CookBlogSection() {
    return (
        <Flex
            bg='lime.300'
            direction='column'
            mt={{ base: 8, lg: '2.75rem' }}
            gap={{ base: 3, lg: 5, '2xl': 8 }}
            borderRadius='2xl'
            p={{ base: 3, lg: '22px' }}
            position='relative'
        >
            <Heading
                fontWeight='500'
                fontSize={{ base: '2xl', lg: '3xl', '2xl': '4xl' }}
                lineHeight={{ base: 8, lg: 9, '2xl': 10 }}
            >
                Кулинарные блоги
            </Heading>
            <SimpleGrid
                spacing={{ base: 3, lg: 4 }}
                templateColumns={{
                    base: 'repeat(auto-fill, minmax(14.125rem, 1fr))',
                    lg: 'repeat(auto-fill, minmax(16.625rem, 1fr))',
                    '2xl': 'repeat(auto-fill, minmax(26.625rem, 1fr))',
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
            >
                <Text fontWeight={600}>Все авторы </Text>
            </Button>
        </Flex>
    );
}
export default CookBlogSection;
