import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
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
        <Box mt={{ base: 8, lg: '2.5rem' }}>
            <Divider mb={2} />
            <Flex
                direction={{ base: 'column', lg: 'row' }}
                align={{ lg: 'center' }}
                justify='space-between'
            >
                <Heading
                    fontWeight='500'
                    fontSize={{ base: '2xl', lg: '4xl', '2xl': '5xl' }}
                    lineHeight={{ base: 8, lg: 10, '2xl': 'none' }}
                    mb={2.5}
                >
                    {currentVariant.name}
                </Heading>
                <Text
                    maxW={{ base: '90%', md: '50%' }}
                    fontSize={{ base: 'sm', lg: 'md' }}
                    lineHeight={{ base: 5, lg: 6 }}
                    color='blackAlpha.700'
                >
                    {currentVariant.description}
                </Text>
            </Flex>
            <Flex mt={4} direction={{ base: 'column', lg: 'row' }} gap={{ base: 3, lg: 6 }}>
                {currentData.slice(0, 2).map((item) => (
                    <RelevantKitchenCard key={item.id} recipe={item} type='medium' />
                ))}
                <Flex direction='column' gap={3}>
                    {currentData.slice(2, 5).map((item) => (
                        <RelevantKitchenCard key={item.id} recipe={item} type='small' />
                    ))}
                </Flex>
            </Flex>
        </Box>
    );
}
export default RelevantKitchenSection;
