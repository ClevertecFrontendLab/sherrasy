import { Box, Divider, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

import { useGetRecipesByCategoryQuery } from '~/query/services/recipes';
import { Category, Subcategory } from '~/types/category.type';
import { getRandomElement } from '~/utils/helpers';

import { RelevantKitchenCard } from '../cards/recipe-cards/relevant-kitchen-card';

type RelevantKitchenSectionProps = {
    categoryInfo?: Category;
};

export const RelevantKitchenSection = ({ categoryInfo }: RelevantKitchenSectionProps) => {
    const subcategories = categoryInfo?.subCategories ?? [];
    const currentSubcategory = useMemo(
        () => getRandomElement<Subcategory>(subcategories)?._id ?? skipToken,
        [subcategories, categoryInfo],
    );
    const { data: recipes } = useGetRecipesByCategoryQuery(currentSubcategory);
    if (!recipes) {
        return <></>;
    }
    return (
        <Box
            mt={{ base: '30px', xs: 8, lg: 14 }}
            pl={{ base: 4, sm: '1.25rem', md: 5, lg: '284px' }}
            pr={{ xs: 4, md: 5, lg: '278px' }}
            width='100%'
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
                    {categoryInfo?.title}
                </Heading>
                <Text
                    maxW={{ base: '90%', sm: '98%', md: '100%', lg: '64%', '2xl': '48%' }}
                    mt={{ base: 0.5, '2xl': 0.5 }}
                    mr={{ '2xl': 2 }}
                    fontSize={{ base: 'sm', lg: 'md' }}
                    lineHeight={{ base: 5, lg: 6 }}
                    color='blackAlpha.700'
                >
                    {categoryInfo?.description}
                </Text>
            </Flex>
            <SimpleGrid
                mt={{ base: 3, xs: 4, sm: 3.5, md: 4 }}
                templateColumns={{ base: '1', sm: 'repeat(3, 1fr)' }}
                gap={{ base: 3, sm: '0.1875rem', md: 3, lg: '1.125rem' }}
            >
                {recipes
                    ?.slice(0, 2)
                    .map((item) => (
                        <RelevantKitchenCard key={item._id} recipe={item} type='medium' />
                    ))}
                <Flex direction='column' gap={{ base: 3, sm: 1, md: 2, lg: 3 }}>
                    {recipes
                        ?.slice(2, 5)
                        .map((item) => (
                            <RelevantKitchenCard key={item._id} recipe={item} type='small' />
                        ))}
                </Flex>
            </SimpleGrid>
        </Box>
    );
};
