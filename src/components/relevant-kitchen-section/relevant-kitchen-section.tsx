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
        <Box p='1.5rem' mt='2.5rem'>
            <Divider />
            <Flex align='center' justify='space-between'>
                <Heading fontWeight={400}> {currentVariant.name}</Heading>
                <Text maxW='50%' color='blackAlpha.700'>
                    {currentVariant.description}{' '}
                </Text>
            </Flex>
            <Flex gap='1.5rem'>
                {currentData.slice(0, 2).map((item) => (
                    <RelevantKitchenCard key={item.id} recipe={item} type='medium' />
                ))}
                <Flex direction='column' gap='0.75rem'>
                    {currentData.slice(2, 5).map((item) => (
                        <RelevantKitchenCard key={item.id} recipe={item} type='small' />
                    ))}
                </Flex>
            </Flex>
        </Box>
    );
}
export default RelevantKitchenSection;
