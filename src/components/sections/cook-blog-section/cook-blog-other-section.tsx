import { Button, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ArrowRightIcon } from '~/assets/icons/icons';
import { CookBlogCard } from '~/components/cards/user-cards/cook-blog-card/cook-blog-card';
import { Blogger } from '~/types/blogger.type';
import { AppRoute } from '~/utils/constant';
import { TestIdName } from '~/utils/testId-name.enum';

export const CookBlogUserOtherSection = ({ bloggers }: { bloggers: Blogger[] }) => {
    const navigate = useNavigate();

    const handleAllClick = async () => {
        navigate(AppRoute.CookBlog);
    };

    return (
        <Stack w='100%' pt={{ base: 4, sm: 6 }} borderRadius='1rem' bg='white'>
            <Flex justify='space-between' align='center' flexDir='row'>
                <Heading
                    fontWeight='500'
                    fontSize={{ base: '2xl', lg: '4xl', xl: '5xl' }}
                    lineHeight={{ base: 8, lg: 10, '2xl': 'none' }}
                    px={0}
                >
                    Другие блоги
                </Heading>

                <Button
                    size='md'
                    bg='transparent'
                    onClick={handleAllClick}
                    rightIcon={<ArrowRightIcon />}
                    data-test-id={TestIdName.BloggerUserOtherBlogsButton}
                >
                    <Text
                        fontWeight={600}
                        fontSize={{ base: 'md', '2xl': 'lg' }}
                        lineHeight={{ base: 6, '2xl': 7 }}
                    >
                        Всe авторы
                    </Text>
                </Button>
            </Flex>
            <Flex align='center' justify='center'>
                <SimpleGrid
                    maxW='100%'
                    gap={{ base: 3, lg: 4 }}
                    px={3}
                    py={{ base: 4, sm: 6 }}
                    templateColumns={{
                        base: '1',
                        sm: 'repeat(3, 1fr)',
                        lg: 'repeat(3, minmax(16.625rem, 1fr))',
                        '2xl': 'repeat(3, minmax(26.625rem, 1fr))',
                    }}
                    data-test-id={TestIdName.BloggerUserOtherBlogsGrid}
                >
                    {bloggers.map((item: Blogger) => (
                        <CookBlogCard key={item._id} author={item} isExtended type='others' />
                    ))}
                </SimpleGrid>
            </Flex>
        </Stack>
    );
};
