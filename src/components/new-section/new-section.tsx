import { Box, Button, Flex, Heading } from '@chakra-ui/react';

import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/icons/icons';
import { newList } from '~/components/cards/mock-cards.json';
import { RecipeWithImage } from '~/types/recipe.interface';

import RecipeCard from '../cards/recipe-card';

function NewSection() {
    return (
        <Box
            mt={{ base: 3.5, xs: 4, lg: '2.5rem' }}
            pl={{ base: 4, sm: 5, lg: '17.75rem' }}
            pr={{ base: 0, sm: 5, lg: '17.375rem' }}
        >
            <Heading
                fontWeight='500'
                fontSize={{ base: '2xl', lg: '4xl', xl: '5xl' }}
                lineHeight={{ base: 8, lg: 10, '2xl': 'none' }}
                mb={{ base: '0.625rem', xs: 3, lg: '1.25rem' }}
            >
                Новые рецепты
            </Heading>
            <Box position='relative'>
                <Flex
                    gap={{ base: 3, sm: 2.5, md: 3, lg: 2.5, '2xl': 6 }}
                    overflowX='auto'
                    overflowY='hidden'
                    sx={{ scrollbarWidth: 'none' }}
                >
                    {newList.map((item: RecipeWithImage) => (
                        <RecipeCard key={item.id} recipe={item} type='vertical' />
                    ))}
                </Flex>
                <Button
                    paddingInline={0}
                    minW={{ lg: '2rem', '2xl': '2.5rem' }}
                    minH={{ lg: '2rem', '2xl': '3rem' }}
                    leftIcon={<ArrowLeftIcon boxSize={{ lg: 4, '2xl': 6 }} />}
                    bg='black'
                    colorScheme='black'
                    display={{ base: 'none', lg: 'initial' }}
                    borderLeftRadius={0}
                    position='absolute'
                    top={{ lg: '38%', '2xl': '36%' }}
                    left={0}
                />
                <Button
                    minW={{ lg: '2rem', '2xl': '2.5rem' }}
                    minH={{ lg: '2rem', '2xl': '3rem' }}
                    rightIcon={<ArrowRightIcon boxSize={{ lg: 4, '2xl': 6 }} />}
                    bg='black'
                    colorScheme='black'
                    paddingInline={0}
                    display={{ base: 'none', lg: 'initial' }}
                    borderRightRadius={0}
                    position='absolute'
                    top={{ lg: '38%', '2xl': '36%' }}
                    right={0}
                />
            </Box>
        </Box>
    );
}
export default NewSection;
