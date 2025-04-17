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
        <Card
            direction={{ base: 'column', sm: 'row' }}
            variant='ghost'
            _hover={{ boxShadow: 'none' }}
            w={{ base: '20.5rem', sm: '14.5rem', lg: '22.0625rem', xl: '34.5625rem' }}
            ml={{ base: 0, sm: 5, lg: '17.75rem' }}
            mr={{ base: 0, sm: 5, lg: '17.375rem' }}
        >
            <Box>
                <Image
                    objectFit='cover'
                    src={image}
                    alt='recipe-photo'
                    w='100%'
                    h={{ base: '14rem', sm: '100%' }}
                    borderTopLeftRadius={{ base: 'md', md: 'lg' }}
                    borderBottomLeftRadius={{ base: 'md', md: 'lg' }}
                />
            </Box>
            <Stack w='100%'>
                <CardHeader py={{ base: 4, sm: 2 }} px={0}>
                    <Flex justify='space-between' align={{ lg: 'center' }}>
                        <SimpleGrid gap={2}>
                            {category.map((item) => (
                                <Badge
                                    key={`${item}-${id}`}
                                    py='1px'
                                    px={{ base: '0.25rem', lg: 2 }}
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
                            spacing={{ base: 7, lg: 4 }}
                            ml={{ base: 1, lg: 0 }}
                            mr={{ base: 1.5, lg: 4, '2xl': 1.5 }}
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
                <CardBody px={0} pt={2} pb={0}>
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
                <CardFooter
                    display='flex'
                    flexDir={{ base: 'column', sm: 'row' }}
                    gap={3}
                    px={0}
                    py={0}
                >
                    <Badge variant='time' minW='6.5rem' maxW='min-content' px={2}>
                        <Icon boxSize={4} mr={{ base: 2 }}>
                            <TimeIcon />
                        </Icon>
                        <Text>{time}</Text>
                    </Badge>
                    <ButtonGroup gap={0.5}>
                        <Button
                            variant='outline'
                            colorScheme='black'
                            size={{ base: 'xs', lg: 'sm' }}
                        >
                            <HeartEyesIcon color='black' />
                            <Text ml={2}>Оценить рецепт</Text>
                        </Button>
                        <Button variant='solid' bg='lime.400' size={{ base: 'xs', lg: 'sm' }}>
                            <BookmarkIcon color='black' />
                            <Text ml={2}>Сохранить в закладки</Text>
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Stack>
        </Card>
    );
}
export default RecipeHeader;
