import { Box, Flex, Heading } from '@chakra-ui/react';

import { newList } from '~/components/cards/mock-cards.json';
import { RecipeWithImage } from '~/types/recipe.interface';

import RecipeCard from '../cards/recipe-card';

function NewSection() {
    return (
        <Box mt={{ base: 8, lg: '2.5rem' }}>
            <Heading
                fontWeight='500'
                fontSize={{ base: '2xl', lg: '4xl' }}
                lineHeight={{ base: 8, lg: 10 }}
                mb={{ base: 3, lg: 6 }}
            >
                {' '}
                Новые рецепты
            </Heading>
            <Flex gap={{ base: 3, '2xl': 6 }} overflowX='auto' overflowY='hidden'>
                {newList.map((item: RecipeWithImage) => (
                    <RecipeCard key={item.id} recipe={item} type='vertical' />
                ))}
            </Flex>
        </Box>
    );
}
export default NewSection;
