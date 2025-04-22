import { Box, Divider, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import { FullRecipe } from '~/types/recipe.interface';
import { AppRoute } from '~/utils/constant';

import RelevantKitchenCard from '../cards/recipe-cards/relevant-kitchen-card';

type RelevantKitchenSectionProps = {
    recipes: FullRecipe[];
};

function RelevantKitchenSection({ recipes }: RelevantKitchenSectionProps) {
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
    const currentData: FullRecipe[] = pathname.includes('vegan')
        ? recipes.slice(0, 5)
        : recipes.slice(5, 10);
    return (
        <Box
            mt={{ base: '30px', xs: 8, lg: 14 }}
            pl={{ base: 4, sm: '1.25rem', md: 5, lg: '284px' }}
            pr={{ xs: 4, md: 5, lg: '278px' }}
        >
            <Divider mb={2} />
            <Flex
                direction={{ base: 'column', lg: 'row' }}
                justify={{ base: 'space-between', lg: 'flex-start', '2xl': 'space-between' }}
                gap={{ lg: 10 }}
            >
                <Heading
                    fontWeight='500'
                    fontSize={{ base: '2xl', lg: '4xl', xl: '5xl' }}
                    lineHeight={{ base: 8, lg: 10, '2xl': 'none' }}
                    maxW={{ lg: '30%', '2xl': '50%' }}
                    mb={{ base: 2, xs: 2.5 }}
                >
                    {currentVariant.name}
                </Heading>
                <Text
                    maxW={{ base: '90%', sm: '98%', md: '100%', lg: '64%', '2xl': '48%' }}
                    mt={{ base: 0.5, '2xl': 0.5 }}
                    mr={{ '2xl': 2 }}
                    fontSize={{ base: 'sm', lg: 'md' }}
                    lineHeight={{ base: 5, lg: 6 }}
                    color='blackAlpha.700'
                >
                    {currentVariant.description}
                </Text>
            </Flex>
            <SimpleGrid
                mt={{ base: 3, xs: 4, sm: 3.5, md: 4 }}
                templateColumns={{ base: '1', sm: 'repeat(3, 1fr)' }}
                gap={{ base: 3, sm: '0.1875rem', md: 3, lg: '1.125rem' }}
            >
                {currentData.slice(0, 2).map((item) => (
                    <RelevantKitchenCard key={item.id} recipe={item} type='medium' />
                ))}
                <Flex direction='column' gap={{ base: 3, sm: 1, md: 2, lg: 3 }}>
                    {currentData.slice(2, 5).map((item) => (
                        <RelevantKitchenCard key={item.id} recipe={item} type='small' />
                    ))}
                </Flex>
            </SimpleGrid>
        </Box>
    );
}
export default RelevantKitchenSection;
