import { Button, Flex, Heading, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ArrowRightIcon } from '~/assets/icons/icons';
import { juicyListShort } from '~/components/cards/mock-cards.json';
import { RecipeWithImage } from '~/types/recipe.interface';

import RecipeCard from '../cards/recipe-card';

function JuicySection() {
    const [isDesktop] = useMediaQuery('(min-width: 992px)');
    const navigate = useNavigate();
    const handleAllClick = () => {
        navigate(`/juiciest`);
    };
    return (
        <Flex
            direction='column'
            mt={{ base: 8, lg: '2.5rem' }}
            gap={{ base: 3, md: 3.5, lg: 4, '2xl': '22px' }}
        >
            <Flex direction='row' justify='space-between' w='100%' align='center'>
                <Heading
                    fontWeight='500'
                    fontSize={{ base: '2xl', lg: '4xl', '2xl': '5xl' }}
                    lineHeight={{ base: 8, lg: 10, '2xl': 'none' }}
                >
                    Самое сочное
                </Heading>
                <Button
                    mt={{ '2xl': 0.5 }}
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
                spacing={{ base: 3, lg: 4, '2xl': 5 }}
                spacingY={{ '2xl': 6 }}
                templateColumns={{
                    base: 'repeat(auto-fill, minmax(20.375rem, 1fr))',
                    lg: 'repeat(auto-fill, minmax(41.75rem, 1fr))',
                }}
            >
                {juicyListShort.map((item: RecipeWithImage) => (
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
