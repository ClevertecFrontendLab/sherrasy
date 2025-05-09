import { Button, Flex, Heading, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ArrowRightIcon } from '~/assets/icons/icons';
import { useGetJuiciestRecipesQuery } from '~/query/services/recipes';
import { FullRecipe } from '~/types/recipe.interface';
import { AppRoute, CardsLimit, SortingBy, SortingDirection, TestIdName } from '~/utils/constant';
import { getRecipeQueryString } from '~/utils/helpers';

import { RecipeCard } from '../cards/recipe-cards/recipe-card';

export const JuicySection = () => {
    const [isTablet] = useMediaQuery('(min-width: 767px )');
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const query = getRecipeQueryString({
        limit: CardsLimit.JuicyPreview,
        page: 1,
        sortBy: SortingBy.Likes,
        sortOrder: SortingDirection.Descending,
    });
    const { data: JuiciestData } = useGetJuiciestRecipesQuery(query);
    const currentRecipes = JuiciestData?.data ?? [];
    const navigate = useNavigate();
    const handleAllClick = async () => {
        navigate(AppRoute.Juiciest);
    };

    return (
        <Flex
            direction='column'
            mt={{ base: 8, sm: '1.875rem', md: 8, lg: '2.5rem' }}
            pl={{ base: 4, lg: '17.75rem' }}
            pr={{ base: 0, sm: 5, lg: '16.25rem' }}
            gap={{ base: 2, xs: 3, sm: 2.5, md: 3, lg: 4, '2xl': '1.375rem' }}
            position='relative'
        >
            <Flex direction='row' justify='space-between' w='100%' align='center'>
                <Heading
                    fontWeight='500'
                    fontSize={{ base: '2xl', lg: '4xl', xl: '5xl' }}
                    lineHeight={{ base: 8, lg: 10, '2xl': 'none' }}
                >
                    Самое сочное
                </Heading>
            </Flex>
            <SimpleGrid
                spacing={{ base: 2.5, xs: 3, md: '14px', lg: 4, '2xl': 5 }}
                spacingY={{ '2xl': 6 }}
                templateColumns={{
                    base: 'repeat(auto-fill, minmax(20.375rem, 1fr))',
                    lg: 'repeat(1, minmax(41.75rem, 1fr))',
                    xl: 'repeat(2, minmax(41.75rem, 1fr))',
                }}
                gridAutoRows='1fr'
            >
                {currentRecipes.slice(0, 4).map((item: FullRecipe, i: number) => (
                    <RecipeCard key={item._id} recipe={item} type='horizontal' testI={`${i}`} />
                ))}
            </SimpleGrid>
            <Button
                mt={{ lg: 0.5 }}
                bg='lime.400'
                size={{ base: 'md', '2xl': 'lg' }}
                alignSelf='center'
                rightIcon={<ArrowRightIcon />}
                onClick={handleAllClick}
                data-test-id={TestIdName.JuiciestLink}
                display={isTablet ? 'flex' : 'none'}
                position={isDesktop ? 'absolute' : 'initial'}
                right={{ sm: 5, lg: '270px' }}
            >
                <Text
                    fontWeight={600}
                    fontSize={{ base: 'md', '2xl': 'lg' }}
                    lineHeight={{ base: 6, '2xl': 7 }}
                >
                    Вся подборка
                </Text>
            </Button>
            <Button
                bg='lime.400'
                size='md'
                alignSelf='center'
                rightIcon={<ArrowRightIcon />}
                onClick={handleAllClick}
                data-test-id={TestIdName.JuiciestLinkMobile}
                display={isTablet ? 'none' : 'flex'}
            >
                <Text
                    fontWeight={600}
                    fontSize={{ base: 'md', '2xl': 'lg' }}
                    lineHeight={{ base: 6, '2xl': 7 }}
                >
                    Вся подборка
                </Text>
            </Button>
        </Flex>
    );
};
