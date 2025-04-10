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
        <Flex direction='column' mt={{ base: 8, lg: '2.5rem' }} gap={{ base: 3, md: 3.5, lg: 6 }}>
            <Heading
                fontWeight='500'
                fontSize={{ base: '2xl', lg: '4xl' }}
                lineHeight={{ base: 8, lg: 10 }}
            >
                {' '}
                Самое сочное
            </Heading>
            <SimpleGrid
                spacing={{ base: 3, lg: 4 }}
                templateColumns={{
                    base: 'repeat(auto-fill, minmax(20.375rem, 1fr))',
                    lg: 'repeat(auto-fill, minmax(41.75rem, 1fr))',
                }}
                overflowX='hidden'
            >
                {juicyListShort.map((item: RecipeWithImage) => (
                    <RecipeCard key={item.id} recipe={item} type='horizontal' />
                ))}
            </SimpleGrid>
            <Button
                bg='lime.400'
                size={{ base: 'md', '2xl': 'lg' }}
                alignSelf='center'
                rightIcon={<ArrowRightIcon />}
                onClick={handleAllClick}
                data-test-id={isDesktop ? 'juiciest-link' : 'juiciest-link-mobile'}
            >
                <Text
                    fontWeight={600}
                    fontSize={{ base: 'md', '2xl': 'lg' }}
                    lineHeight={{ base: 6, '2xl': 7 }}
                >
                    Вся подборка{' '}
                </Text>
            </Button>
        </Flex>
    );
}
export default JuicySection;
