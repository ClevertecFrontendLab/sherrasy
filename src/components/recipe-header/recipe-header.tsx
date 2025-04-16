import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Icon,
    Image,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';

import { BookmarkIcon, HeartEyesIcon, TimeIcon } from '~/assets/icons/icons';
import { FullRecipe } from '~/types/recipe.interface';
import { TagToName } from '~/utils/constant';
import { iconsByTag } from '~/utils/iconsByTag';

type RecipeHeaderProps = {
    recipe: FullRecipe;
};

function RecipeHeader({ recipe }: RecipeHeaderProps) {
    const { id, title, time, description, category, bookmarks, likes, image } = recipe;
    return (
        <Card direction='row' variant='ghost' _hover={{ boxShadow: 'none' }}>
            <Box position='relative'>
                <Image
                    objectFit='cover'
                    src={image}
                    alt='recipe-photo'
                    h='100%'
                    borderTopLeftRadius={{ base: 'md', md: 'lg' }}
                    borderBottomLeftRadius={{ base: 'md', md: 'lg' }}
                />
            </Box>
            <Stack w='100%'>
                <CardHeader>
                    <Flex justify='space-between' align={{ lg: 'center' }}>
                        <SimpleGrid>
                            {category.map((item) => (
                                <Badge
                                    key={`${item}-${id}`}
                                    py='1px'
                                    px={{ base: '0.25rem', lg: 2 }}
                                    position={{ base: 'absolute', lg: 'inherit' }}
                                    top={2}
                                    left={2}
                                    variant='hCard'
                                >
                                    <Icon boxSize={4} mr={{ base: 0.5, lg: 1.5 }}>
                                        {iconsByTag[item]}
                                    </Icon>
                                    <Text>{TagToName[item]}</Text>
                                </Badge>
                            ))}
                        </SimpleGrid>

                        <ButtonGroup
                            spacing={4}
                            ml={{ base: 1, lg: 0 }}
                            mr={{ lg: 4, '2xl': 1.5 }}
                            maxH='1.5rem'
                        >
                            <Button
                                leftIcon={<BookmarkIcon color='black' boxSize={{ base: 3 }} />}
                                color='lime.600'
                                bg='transparent'
                                p={0}
                                size='sm'
                                fontSize='xs'
                                lineHeight={4}
                                iconSpacing='0.375rem'
                                h='100%'
                            >
                                {bookmarks}
                            </Button>
                            <Button
                                leftIcon={<HeartEyesIcon color='black' boxSize={{ base: 3 }} />}
                                color='lime.600'
                                bg='transparent'
                                p={0}
                                size='sm'
                                fontSize='xs'
                                lineHeight={4}
                                iconSpacing='0.375rem'
                                h='100%'
                            >
                                {likes}
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </CardHeader>
                <CardBody textAlign='start'>
                    <Heading
                        mb={{
                            base: '13px',
                            xs: '1rem',
                            sm: '0.75rem',
                            md: '1rem',
                            lg: 3,
                            xl: 3 - 1,
                            '2xl': 3,
                        }}
                        fontSize={{ base: '2xl', lg: '5xl' }}
                        lineHeight={{ base: 8, lg: 'none' }}
                    >
                        {title}
                    </Heading>
                    <Text
                        color='blackAlpha.600'
                        mb={{ base: '13px', xs: '1rem', lg: 8 }}
                        fontSize={{ base: 'sm', lg: 'md' }}
                        lineHeight={{ base: 5, lg: 6 }}
                        noOfLines={4}
                    >
                        {description}
                    </Text>
                </CardBody>
                <CardFooter>
                    <Badge variant='time'>
                        <Icon>
                            <TimeIcon />
                        </Icon>
                        <Text>{time}</Text>
                    </Badge>
                    <ButtonGroup>
                        <Button
                            variant='outline'
                            colorScheme='black'
                            size={{ base: 'xs', lg: 'sm' }}
                            w={{ base: 4, lg: 'initial' }}
                        >
                            <HeartEyesIcon color='black' />
                            <Text ml={2} display={{ base: 'none', lg: 'inline' }}>
                                Оценить рецепт
                            </Text>
                        </Button>
                        <Button
                            variant='solid'
                            bg='lime.400'
                            size={{ base: 'xs', lg: 'sm' }}
                            w={{ base: 4, lg: 'initial' }}
                        >
                            <BookmarkIcon color='black' />
                            <Text ml={2} display={{ base: 'none', lg: 'inline' }}>
                                Сохранить в закладки
                            </Text>
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Stack>
        </Card>
    );
}
export default RecipeHeader;
