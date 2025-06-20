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
import { checkRecipeAuthor } from '~/utils/helpers/blogger-author-helpers';

import { BadgesList } from '../badges-list/badges-list';
import { RecipeControls } from '../recipe-controls/recipe-controls';

type RecipeHeaderProps = {
    recipe: FullRecipe;
    onDeleteStart?: () => void;
};

export const RecipeHeader = ({ recipe, onDeleteStart }: RecipeHeaderProps) => {
    const { _id, title, time, description, categoriesIds, bookmarks, likes, image, authorId } =
        recipe;
    const isAuthor = checkRecipeAuthor(authorId);

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            variant='ghost'
            _hover={{ boxShadow: 'none' }}
            minW={{ base: '20.5rem', sm: '45.5rem', lg: '55rem', '2xl': '85rem' }}
            ml={{ base: 4, sm: 5 }}
            mr={{ base: 4, sm: 5 }}
            gap={{ sm: 4, lg: 6 }}
        >
            <Box>
                <Image
                    objectFit='cover'
                    src={image}
                    alt={title}
                    minW={{ sm: '14.5rem', lg: '22.0625rem', xl: '34.5625rem' }}
                    w='100%'
                    h={{ base: '14rem', lg: '25.625rem' }}
                    borderRadius={{ base: 'md', md: 'lg' }}
                />
            </Box>
            <Stack w='100%'>
                <CardHeader py={{ base: 4, sm: 0 }} px={0}>
                    <Flex justify='space-between'>
                        <SimpleGrid
                            gap={2}
                            templateColumns={{ sm: 'repeat(2, 1fr)', xl: 'repeat(3,1fr)' }}
                        >
                            <BadgesList categoriesIds={categoriesIds} type='hCard' />
                        </SimpleGrid>
                        <ButtonGroup
                            spacing={{ base: 7, lg: 4, xl: 10 }}
                            mt={{ xl: 1.5 }}
                            ml={{ base: 1, lg: 0 }}
                            mr={{ base: 1.5, lg: 4, xl: 5 }}
                            maxH={{ base: '1.5rem', xl: '2rem' }}
                        >
                            <Button
                                leftIcon={
                                    <BookmarkIcon
                                        color='black'
                                        boxSize={{ base: 3, xl: '0.875rem' }}
                                    />
                                }
                                color='lime.600'
                                bg='transparent'
                                p={0}
                                size='sm'
                                fontSize={{ base: 'xs', xl: 'sm' }}
                                lineHeight={{ base: 4, xl: 5 }}
                                iconSpacing='0.375rem'
                                h='100%'
                            >
                                {bookmarks}
                            </Button>
                            <Button
                                leftIcon={
                                    <HeartEyesIcon
                                        color='black'
                                        boxSize={{ base: 3, xl: '0.875rem' }}
                                    />
                                }
                                color='lime.600'
                                bg='transparent'
                                p={0}
                                size='sm'
                                fontSize={{ base: 'xs', xl: 'sm' }}
                                lineHeight={{ base: 4, xl: 5 }}
                                iconSpacing='0.375rem'
                                h='100%'
                            >
                                {likes}
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </CardHeader>
                <CardBody px={0} pt={{ base: 2, sm: 6, xl: '1.875rem' }} pb={0}>
                    <Heading
                        mb={{
                            base: '13px',
                            xs: '1rem',
                            sm: '0.75rem',
                            md: '1rem',
                            lg: 6,
                        }}
                        fontSize={{ base: '2xl', lg: '5xl' }}
                        lineHeight={{ base: 8, lg: 'none' }}
                        noOfLines={{ base: 2, sm: 1, lg: 2 }}
                        maxW={{ lg: '31.4375rem', xl: '33rem' }}
                    >
                        {title}
                    </Heading>
                    <Text
                        mb={{ base: '13px', xs: '1rem' }}
                        fontSize={{ base: 'sm' }}
                        lineHeight={{ base: 5 }}
                        noOfLines={{ base: 3, sm: 2 }}
                        maxW={{ lg: '31.4375rem', xl: '33rem' }}
                    >
                        {description}
                    </Text>
                </CardBody>
                <CardFooter
                    display='flex'
                    flexDir={{ base: 'column', sm: 'row' }}
                    alignItems={{ lg: 'center' }}
                    justify={{ sm: 'space-between' }}
                    gap={3}
                    px={0}
                    py={0}
                >
                    <Badge variant='time' minW='6.5rem' maxW='min-content' px={2} mt={{ lg: 1.5 }}>
                        <Icon boxSize={4} mr={{ base: 2 }}>
                            <TimeIcon />
                        </Icon>
                        <Text>{time} минут</Text>
                    </Badge>
                    <RecipeControls
                        isAuthor={isAuthor}
                        recipeId={_id}
                        onDeleteStart={onDeleteStart}
                    />
                </CardFooter>
            </Stack>
        </Card>
    );
};
