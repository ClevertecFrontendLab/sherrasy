import {
    Avatar,
    Badge,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Highlight,
    HStack,
    Image,
    SimpleGrid,
    Stack,
    Text,
    useMediaQuery,
} from '@chakra-ui/react';
import { memo } from 'react';

import { BookmarkIcon, HeartEyesIcon } from '~/assets/icons/icons';
import { BadgesList } from '~/components/badges-list/badges-list';
import { withRecipeNavigation } from '~/hoc/withRecipeNavigation';
import { useAppSelector } from '~/store/hooks';
import { getRecipesSearchString } from '~/store/recipes/selectors';
import { FullRecipe } from '~/types/recipe.interface';
import { cookBlog } from '~/utils/data/mock-cards.json';
import { TestIdName } from '~/utils/testId-name.enum';

type CardProps = {
    recipe: FullRecipe;
    onClick: () => void;
    testI?: string;
};
type RecipeCardProps = CardProps & {
    type: 'horizontal' | 'vertical';
};

const VerticalRecipeCard = memo(({ recipe, onClick, testI }: CardProps) => {
    const { title, image, description, categoriesIds, bookmarks, likes } = recipe;
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    return (
        <Card position='relative' variant='vCard' onClick={onClick} data-test-id={testI}>
            <CardBody>
                <Image
                    loading='lazy'
                    objectFit='cover'
                    src={image}
                    alt={title}
                    width='100%'
                    h={['7.5rem', '8rem', '7.75rem', '8rem', '14.375rem']}
                    borderTopLeftRadius={{ base: 'md', md: 'lg' }}
                    borderTopRightRadius={{ base: 'md', md: 'lg' }}
                />
                <Stack
                    mt='0.25rem'
                    spacing={{ base: 3, lg: 2, '2xl': 3 }}
                    px={{ base: 2, md: 1.5, lg: 2.5, '2xl': '22px' }}
                    py={{ base: 1, lg: 2.5, '2xl': 3 }}
                    pb={{ base: 0.5, xs: 1 }}
                    maxW={{ md: '90%', lg: '100%' }}
                    minH='3.5rem'
                >
                    <Text
                        fontWeight={500}
                        fontSize={{ base: 'md', lg: 'lg', '2xl': 'xl' }}
                        lineHeight={{ base: 6, lg: 7 }}
                        noOfLines={{ base: 2, lg: 1 }}
                        wordBreak={{ lg: 'break-all' }}
                    >
                        {title}
                    </Text>
                    {isDesktop && (
                        <Text fontSize={{ lg: 'sm' }} lineHeight={{ lg: 5 }} noOfLines={3}>
                            {description}
                        </Text>
                    )}
                </Stack>
            </CardBody>
            <CardFooter>
                <HStack
                    w='100%'
                    justify={{ base: 'space-between', lg: 'flex-end' }}
                    align='flex-start'
                >
                    <SimpleGrid
                        gap={2}
                        templateColumns={{ base: 'repeat(1, 60px)', lg: 'repeat(1, 140px)' }}
                        position='absolute'
                        top={2}
                        left={2}
                    >
                        <BadgesList categoriesIds={categoriesIds} type='vCard' />
                    </SimpleGrid>
                    <ButtonGroup spacing='9px' alignSelf='end'>
                        <Button
                            leftIcon={<BookmarkIcon color='black' boxSize={{ base: 3 }} />}
                            color='lime.600'
                            bg='transparent'
                            p={0}
                            size='sm'
                            fontSize='xs'
                            lineHeight={4}
                            iconSpacing='6px'
                        >
                            {bookmarks ?? 0}
                        </Button>
                        <Button
                            leftIcon={<HeartEyesIcon color='black' boxSize={{ base: 3 }} />}
                            color='lime.600'
                            bg='transparent'
                            p={0}
                            size='sm'
                            fontSize='xs'
                            lineHeight={4}
                            iconSpacing='6px'
                        >
                            {likes ?? 0}
                        </Button>
                    </ButtonGroup>
                </HStack>
            </CardFooter>
        </Card>
    );
});

const HorizontalRecipeCard = ({ recipe, onClick, testI }: CardProps) => {
    const {
        title = '',
        image,
        description,
        categoriesIds,
        bookmarks,
        likes,
        recommendedBy,
    } = recipe;
    const searchString = useAppSelector(getRecipesSearchString);
    const author = recommendedBy
        ? cookBlog.find((item) => +item.id === recommendedBy) || null
        : null;
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const hilghlightStr = searchString ? searchString : '';
    return (
        <Card direction='row' variant='hCard' data-test-id={testI?.includes('food') ? testI : ''}>
            <Box position='relative' maxW='50%' maxH='min-content'>
                <Image
                    loading='lazy'
                    objectFit='cover'
                    aspectRatio={16 / 9}
                    src={image}
                    alt={title}
                    minW={['9.25rem', '9.875rem', '9.625rem', '9.875rem', '21.625rem']}
                    maxW={['9.25rem', '9.875rem', '9.625rem', '9.875rem', '21.625rem']}
                    h='100%'
                    borderTopLeftRadius={{ base: 'md', md: 'lg' }}
                    borderBottomLeftRadius={{ base: 'md', md: 'lg' }}
                />
                {author && (
                    <Badge
                        variant='author'
                        position='absolute'
                        bottom={{ base: '10px', lg: 5 }}
                        left={{ lg: 6 }}
                        display={{ base: 'none', lg: 'unset' }}
                    >
                        <Flex align='center' justify='space-evenly' px={1} py={0.5}>
                            <Avatar
                                size='xs'
                                boxSize={4}
                                name={author.name}
                                src={author.avatar}
                                mr={2}
                            />
                            <Text>{author.name} рекомендует</Text>
                        </Flex>
                    </Badge>
                )}
            </Box>
            <Stack
                spacing={{ xs: 3, sm: 2, md: 3 }}
                py={{ base: 1, lg: 4 }}
                pr={{ base: 0, lg: 2.5, '2xl': 3 }}
                pl={{ base: 2, lg: 6, '2xl': 9 }}
                w='100%'
                maxW={{ lg: '33.375rem', '2xl': '20.125rem' }}
            >
                <CardBody>
                    <Flex justify={{ lg: 'flex-end' }}>
                        <SimpleGrid
                            gap={2}
                            templateColumns={{
                                base: 'repeat(1, 60px)',
                                lg: 'repeat(2, 140px)',
                                xl: 'repeat(1, 140px)',
                            }}
                            position='absolute'
                            top={2}
                            left={2}
                        >
                            <BadgesList categoriesIds={categoriesIds} type='hCard' />
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
                    <Box
                        mt={{ base: 1, lg: 6, '2xl': '26px' }}
                        pr={{ lg: 0.5, '2xl': 1 }}
                        textAlign='start'
                        minH={{ base: '55px', xs: '48px' }}
                        maxW={{ base: '94%', lg: '100%' }}
                    >
                        <Text
                            size='md'
                            whiteSpace={{ lg: 'nowrap' }}
                            overflow={{ lg: 'hidden' }}
                            textOverflow={{ lg: 'ellipsis' }}
                            noOfLines={!isDesktop ? { base: 2 } : {}}
                            fontWeight={500}
                            fontSize={{ base: 'md', lg: 'xl' }}
                            lineHeight={{ base: 6, lg: 7 }}
                            mb={{ lg: 2 }}
                        >
                            <Highlight query={hilghlightStr} styles={{ color: 'lime.600' }}>
                                {title}
                            </Highlight>
                        </Text>
                        {isDesktop && (
                            <Text
                                fontSize='sm'
                                lineHeight={5}
                                maxW={{ '2xl': '94%' }}
                                noOfLines={{ lg: 2, '2xl': 3 }}
                            >
                                {description}
                            </Text>
                        )}
                    </Box>
                </CardBody>
                <CardFooter>
                    <Button
                        variant='outline'
                        colorScheme='black'
                        size={{ base: 'xs', lg: 'sm' }}
                        w={{ base: 4, lg: 'initial' }}
                    >
                        <BookmarkIcon color='black' />
                        <Text ml={2} display={{ base: 'none', lg: 'inline' }}>
                            Сохранить
                        </Text>
                    </Button>
                    <Button
                        variant='solid'
                        bg='black'
                        color='white'
                        size={{ base: 'xs', lg: 'sm' }}
                        px={{ base: 2, lg: '12px' }}
                        py={{ base: 1, lg: '6px' }}
                        data-test-id={
                            testI?.includes('food') ? '' : `${TestIdName.CardLink}-${testI}`
                        }
                        onClick={onClick}
                    >
                        Готовить
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

const RecipeCardComponent = ({ recipe, type, testI, onClick }: RecipeCardProps) =>
    type === 'vertical' ? (
        <VerticalRecipeCard recipe={recipe} onClick={onClick} testI={testI} />
    ) : (
        <HorizontalRecipeCard recipe={recipe} onClick={onClick} testI={testI} />
    );

export const RecipeCard = withRecipeNavigation(RecipeCardComponent);
