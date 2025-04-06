import { Box, Flex, Heading } from '@chakra-ui/react';

import { newList } from '~/components/cards/mock-cards.json';
import { RecipeWithImage } from '~/types/recipe.interface';

import RecipeCard from '../cards/recipe-card';

function NewSection() {
    return (
        <Box p='1.5rem' mt='2.5rem'>
            <Heading fontWeight={400}> Новые рецепты</Heading>
            <Flex gap='1.5rem'>
                {newList.map((item: RecipeWithImage) => (
                    <RecipeCard key={item.id} recipe={item} type='vertical' />
                ))}
            </Flex>
        </Box>
    );
}
export default NewSection;
