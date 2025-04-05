import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react';

import { cookBlog } from '~/components/cards/mock-cards.json';
import { Author } from '~/types/author.interface';

import CookBlogCard from '../cards/cook-blog-card';

function CookBlogSection() {
    return (
        <Box bg='lime.300' p='1.5rem' mt='2.5rem'>
            <Flex align='center' justify='space-between'>
                <Heading fontWeight={400}> Кулинарные блоги</Heading>
                <HStack>
                    <Text fontWeight={600}>Все авторы </Text>
                    <ArrowForwardIcon />
                </HStack>
            </Flex>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(426px, 1fr))'>
                {cookBlog.map((item: Author) => (
                    <CookBlogCard key={item.id} author={item} />
                ))}
            </SimpleGrid>
        </Box>
    );
}
export default CookBlogSection;
