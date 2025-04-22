import { Button, Flex, Heading, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ArrowRightIcon } from '~/assets/icons/icons';
import { FullRecipe } from '~/types/recipe.interface';

import RecipeCard from '../cards/recipe-cards/recipe-card';

type JuicySectionProps = {
    recipes: FullRecipe[];
};

function JuicySection({ recipes }: JuicySectionProps) {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const navigate = useNavigate();
    const handleAllClick = () => {
        navigate(`/juiciest`);
    };
    return (
        <Flex
            direction='column'
            mt={{ base: 8, sm: '1.875rem', md: 8, lg: '2.5rem' }}
            pl={{ base: 4, sm: 5, lg: '17.75rem' }}
            pr={{ base: 0, sm: 5, lg: '17.375rem' }}
            gap={{ base: 2, xs: 3, sm: 2.5, md: 3, lg: 4, '2xl': '1.375rem' }}
        >
            <Flex direction='row' justify='space-between' w='100%' align='center'>
                <Heading
                    fontWeight='500'
                    fontSize={{ base: '2xl', lg: '4xl', xl: '5xl' }}
                    lineHeight={{ base: 8, lg: 10, '2xl': 'none' }}
                >
                    Самое сочное
                </Heading>
                <Button
                    mt={{ lg: 0.5 }}
                    bg='lime.400'
                    size={{ base: 'md', '2xl': 'lg' }}
                    alignSelf='center'
                    rightIcon={<ArrowRightIcon />}
                    onClick={handleAllClick}
                    data-test-id='juiciest-link'
                    display={isDesktop ? 'flex' : 'none'}
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
            <SimpleGrid
                spacing={{ base: 2.5, xs: 3, md: '14px', lg: 4, '2xl': 5 }}
                spacingY={{ '2xl': 6 }}
                templateColumns={{
                    base: 'repeat(auto-fill, minmax(20.375rem, 1fr))',
                    lg: 'repeat(1, minmax(41.75rem, 1fr))',
                    xl: 'repeat(2, minmax(41.75rem, 1fr))',
                }}
            >
                {recipes.map((item: FullRecipe) => (
                    <RecipeCard key={item.id} recipe={item} type='horizontal' />
                ))}
            </SimpleGrid>
            <Button
                bg='lime.400'
                size='md'
                alignSelf='center'
                rightIcon={<ArrowRightIcon />}
                onClick={handleAllClick}
                data-test-id='juiciest-link-mobile'
                display={isDesktop ? 'none' : 'flex'}
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
}
export default JuicySection;
