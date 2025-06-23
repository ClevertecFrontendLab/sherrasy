import {
    Button,
    ButtonGroup,
    Center,
    Flex,
    HStack,
    Image,
    Text,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';

import { BookmarkIcon, PeopleIconOutline, RecommendIcon } from '~/assets/icons/icons';
import recommendRecipe from '~/assets/images/recommend-recipe.png';

export const RecommendationBanner = ({
    totalBookmarks,
    totalSubscribers,
}: {
    totalBookmarks: number;
    totalSubscribers: number;
}) => {
    const [isMobile] = useMediaQuery('(max-width:480px)');

    if (totalBookmarks < 200 && totalSubscribers < 100) return null;
    return (
        <Center
            w='100%'
            py={{ base: 4, sm: 6 }}
            px={{ base: 4, sm: 8 }}
            borderRadius='16px'
            bg='lime.150'
            justifyContent='space-between'
        >
            <Flex
                w='100%'
                gap={8}
                alignItems='center'
                flexDirection={{ base: 'column', sm: 'row' }}
                position='relative'
            >
                <Image
                    src={recommendRecipe}
                    alt='recommendRecipe icon'
                    boxSize={{ base: '108px', md: '206px' }}
                />

                <VStack alignItems='start'>
                    <Text
                        fontSize={{ base: 'xl', md: '4xl' }}
                        maxW='36.1875rem'
                        fontWeight='semibold'
                        lineHeight={{ base: '24px', md: '40px' }}
                        mb={6}
                    >
                        Теперь вы можете рекомендовать рецепты других авторов
                    </Text>

                    <Flex gap={3} alignItems='center' wrap='wrap'>
                        <Text fontSize='md' lineHeight='24px' fontWeight='500'>
                            Это можно будет сделать с помощью кнопки
                        </Text>
                        <Button
                            variant='solid'
                            colorScheme='black'
                            size={{ base: 'xs', md: 'sm' }}
                            pointerEvents='none'
                            leftIcon={<RecommendIcon />}
                        >
                            Рекомендовать рецепт
                        </Button>
                    </Flex>
                </VStack>

                <HStack
                    position={isMobile ? 'absolute' : 'inherit'}
                    top={isMobile ? 2 : 'inherit'}
                    right={isMobile ? 4 : 'inherit'}
                    alignSelf='start'
                    ml='auto'
                >
                    <ButtonGroup
                        spacing={4}
                        ml={{ base: 1, lg: 0 }}
                        mr={{ lg: 4, '2xl': 1.5 }}
                        maxH='1.5rem'
                    >
                        <Button
                            leftIcon={<BookmarkIcon color='black' boxSize={{ base: 3, lg: 4 }} />}
                            color='lime.600'
                            bg='transparent'
                            p={0}
                            size='sm'
                            fontSize='xs'
                            lineHeight={4}
                            iconSpacing='0.375rem'
                            h='100%'
                            _hover='none'
                        >
                            {totalBookmarks}
                        </Button>
                        <Button
                            leftIcon={
                                <PeopleIconOutline color='black' boxSize={{ base: 3, lg: 4 }} />
                            }
                            color='lime.600'
                            bg='transparent'
                            p={0}
                            size='sm'
                            fontSize='xs'
                            lineHeight={4}
                            iconSpacing='0.375rem'
                            h='100%'
                            _hover='none'
                        >
                            {totalSubscribers}
                        </Button>
                    </ButtonGroup>
                </HStack>
            </Flex>
        </Center>
    );
};
