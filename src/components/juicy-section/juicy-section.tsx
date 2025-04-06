import { Box, Button, Flex, Heading, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ArrowRightIcon } from '~/assets/icons/icons';
import { juicyListShort } from '~/components/cards/mock-cards.json';
import { RecipeWithImage } from '~/types/recipe.interface';

import RecipeCard from '../cards/recipe-card';

function JuicySection() {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const navigate = useNavigate();
    const handleAllClick = () => {
        navigate(`/juiciest`);
    };
    return (
        <Box p='1.5rem' mt='2.5rem'>
            <Flex align='center' justify='space-between'>
                <Heading fontWeight={400}> Самое сочное</Heading>
                <Button
                    bg='lime.400'
                    size='lg'
                    w='auto'
                    rightIcon={<ArrowRightIcon />}
                    onClick={handleAllClick}
                    data-test-id={isDesktop ? 'juiciest-link' : 'juiciest-link-mobile'}
                >
                    <Text fontWeight={600}>Вся подборка </Text>
                </Button>
            </Flex>{' '}
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(41.75rem, 1fr))'>
                {juicyListShort.map((item: RecipeWithImage) => (
                    <RecipeCard key={item.id} recipe={item} type='horizontal' />
                ))}
            </SimpleGrid>
        </Box>
    );
}
export default JuicySection;
