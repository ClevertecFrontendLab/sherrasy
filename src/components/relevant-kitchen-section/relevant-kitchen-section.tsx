import { Box, Divider, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import { textDessertList, textVeganList } from '~/components/cards/mock-cards.json';
import { AppRoute } from '~/utils/constant';

import RelevantKitchenCard from '../cards/relevant-kitchen-card';

function RelevantKitchenSection() {
    const kitchenVariants = {
        vegan: {
            name: 'Веганская кухня',
            description:
                'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        },
        dessert: {
            name: 'Десерты, выпечка',
            description:
                'Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.',
        },
    };
    const { pathname } = useLocation();
    const currentVariant = pathname.includes(AppRoute.Vegan)
        ? kitchenVariants.dessert
        : kitchenVariants.vegan;
    const currentData = pathname.includes(AppRoute.Vegan) ? textDessertList : textVeganList;

    return (
        <Box mt={{ base: 8, lg: 14 }}>
            <Divider mb={2} />
            <Flex
                direction={{ base: 'column', lg: 'row' }}
                justify={{ base: 'space-between', lg: 'flex-start', '2xl': 'space-between' }}
                gap={{ lg: 10 }}
            >
                <Heading
                    fontWeight='500'
                    fontSize={{ base: '2xl', lg: '4xl', '2xl': '5xl' }}
                    lineHeight={{ base: 8, lg: 10, '2xl': 'none' }}
                    maxW={{ lg: '30%', '2xl': '50%' }}
                    mb={2.5}
                >
                    {currentVariant.name}
                </Heading>
                <Text
                    maxW={{ base: '90%', md: '100%', lg: '64%', '2xl': '48%' }}
                    mt={{ '2xl': 0.5 }}
                    mr={{ '2xl': 2 }}
                    fontSize={{ base: 'sm', lg: 'md' }}
                    lineHeight={{ base: 5, lg: 6 }}
                    color='blackAlpha.700'
                >
                    {currentVariant.description}
                </Text>
            </Flex>
            <SimpleGrid
                mt={4}
                templateColumns={{ base: '1', md: 'repeat(3, 1fr)' }}
                gap={{ base: 3, md: 3.5, lg: '1.125rem' }}
            >
                {currentData.slice(0, 2).map((item) => (
                    <RelevantKitchenCard key={item.id} recipe={item} type='medium' />
                ))}
                <Flex direction='column' gap={{ base: 3 }}>
                    {currentData.slice(2, 5).map((item) => (
                        <RelevantKitchenCard key={item.id} recipe={item} type='small' />
                    ))}
                </Flex>
            </SimpleGrid>
        </Box>
    );
}
export default RelevantKitchenSection;
