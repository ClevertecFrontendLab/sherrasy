import { Box, Divider, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router';

import { useRandomCategory } from '~/hooks/useRandomCategory';
import { useGetRelevantRecipesQuery } from '~/query/services/recipes';
import { PathParams } from '~/types/params.type';

import { RelevantKitchenCard } from '../cards/recipe-cards/relevant-kitchen-card';

export const RelevantKitchenSection = () => {
    const { categoryId } = useParams<PathParams>();
    const { currentCategory, currentSubcategory } = useRandomCategory(categoryId);

    const { data: recipes, isFetching } = useGetRelevantRecipesQuery(
        currentSubcategory ?? skipToken,
    );

    if (isFetching) {
        return null;
    }

    if (!isFetching && !recipes) {
        return null;
    }
    return (
        <Box
            mt={{ base: '30px', xs: 8, lg: 14 }}
            pl={{ base: 4, sm: '1.25rem', md: 5 }}
            pr={{ xs: 4, md: 5 }}
            width='100%'
        >
            <Divider mb={2} />
            <Flex
                direction={{ base: 'column', lg: 'row' }}
                justify={{ base: 'space-between' }}
                gap={{ lg: 10 }}
            >
                <Heading
                    fontWeight='500'
                    fontSize={{ base: '2xl', lg: '4xl', xl: '5xl' }}
                    lineHeight={{ base: 8, lg: 10, '2xl': 'none' }}
                    maxW={{ lg: '32%', '2xl': '50%' }}
                    mb={{ base: 2, xs: 2.5 }}
                >
                    {currentCategory?.title}
                </Heading>
                <Text
                    maxW={{ base: '90%', sm: '98%', md: '100%', lg: '64%', '2xl': '48%' }}
                    mt={{ base: 0.5, '2xl': 0.5 }}
                    mr={{ '2xl': 2 }}
                    fontSize={{ base: 'sm', lg: 'md' }}
                    lineHeight={{ base: 5, lg: 6 }}
                    color='blackAlpha.700'
                >
                    {currentCategory?.description}
                </Text>
            </Flex>
            <SimpleGrid
                mt={{ base: 3, xs: 4, sm: 3.5, md: 4 }}
                templateColumns={{ base: '1', sm: 'repeat(3, 1fr)' }}
                gap={{ base: 3, sm: '0.1875rem', md: 3, lg: '1.125rem' }}
            >
                {recipes
                    ?.slice(0, 2)
                    .map((item, i) => (
                        <RelevantKitchenCard key={`${i}-${item._id}`} recipe={item} type='medium' />
                    ))}
                <Flex direction='column' gap={{ base: 3, sm: 1, md: 2, lg: 3 }}>
                    {recipes
                        ?.slice(2, 5)
                        .map((item, i) => (
                            <RelevantKitchenCard
                                key={`${item._id}-${i}`}
                                recipe={item}
                                type='small'
                            />
                        ))}
                </Flex>
            </SimpleGrid>
        </Box>
    );
};
