import { Box, Button, Flex, Heading } from '@chakra-ui/react';

import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/icons/icons';
import { newList } from '~/components/cards/mock-cards.json';
import { RecipeWithImage } from '~/types/recipe.interface';

import RecipeCard from '../cards/recipe-card';

function NewSection() {
    return (
        <Box mt={{ base: 4, lg: '2.5rem' }} position='relative'>
            <Heading
                fontWeight='500'
                fontSize={{ base: '2xl', lg: '4xl', '2xl': '5xl' }}
                lineHeight={{ base: 8, lg: 10, '2xl': 'none' }}
                mb={{ base: 3, lg: '1.25rem' }}
            >
                Новые рецепты
            </Heading>
            <Flex gap={{ base: 3, lg: 2.5, '2xl': 6 }} overflowX='auto' overflowY='hidden'>
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
                top={{ lg: '46%', '2xl': '45%' }}
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
                top={{ lg: '46%', '2xl': '45%' }}
                right={0}
            />
        </Box>
    );
}
export default NewSection;
