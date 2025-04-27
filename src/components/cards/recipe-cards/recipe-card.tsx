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
    Icon,
    Image,
    Stack,
    Text,
    useMediaQuery,
} from '@chakra-ui/react';

import { BookmarkIcon, HeartEyesIcon } from '~/assets/icons/icons';
import { withRecipeNavigation } from '~/hoc/withRecipeNavigation';
import { useAppSelector } from '~/store/hooks';
import { getRecipesSearchString } from '~/store/recipes/selectors';
import { FullRecipe } from '~/types/recipe.interface';
import { TagToName } from '~/utils/constant';
import { cookBlog } from '~/utils/data/mock-cards.json';
import { iconsByTag } from '~/utils/iconsByTag';

type CardProps = {
    recipe: FullRecipe;
    onClick: () => void;
    testI?: string;
};
type RecipeCardProps = CardProps & {
    type: 'horizontal' | 'vertical';
};

function VerticalRecipeCard({ recipe, onClick, testI }: CardProps) {
    const { title, image, description, category, bookmarks, likes } = recipe;
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    return (
        <Card position='relative' variant='vCard' onClick={onClick} data-test-id={testI}>
            <CardBody>
                <Image
                    objectFit='cover'
                    src={image}
                    alt='recipe-photo'
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
                <Flex w='100%' justify='space-between' align={{ lg: 'center' }}>
                    <Badge
                        py='0.0625rem'
                        px={{ base: '0.25rem', lg: 2 }}
                        position={{ base: 'absolute', lg: 'inherit' }}
                        top={2}
                        left={2}
                        variant='vCard'
                    >
                        <Icon boxSize={4} mr={{ base: '1px', lg: 1.5 }}>
                            {iconsByTag[category[0]]}
                        </Icon>
                        {TagToName[category[0]]}
                    </Badge>
                    <ButtonGroup spacing='9px'>
                        {bookmarks > 0 && (
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
                                {bookmarks}
                            </Button>
                        )}
                        {likes > 0 && (
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
                                {likes}
                            </Button>
                        )}
                    </ButtonGroup>
                </Flex>
            </CardFooter>
        </Card>
    );
}

function HorizontalRecipeCard({ recipe, onClick, testI }: CardProps) {
    const { title, image, description, category, bookmarks, likes, recommendedBy } = recipe;
    const searchString = useAppSelector(getRecipesSearchString);
    const author = recommendedBy
        ? cookBlog.find((item) => +item.id === recommendedBy) || null
        : null;
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    return (
        <Card direction='row' variant='hCard' data-test-id={testI?.includes('food') ? testI : ''}>
            <Box position='relative' maxW='50%' maxH='100%'>
                <Image
                    objectFit='cover'
                    src={image}
                    alt='recipe-photo'
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
                    <Flex justify='space-between' align={{ lg: 'center' }}>
                        <Badge
                            py='1px'
                            px={{ base: '0.25rem', lg: 2 }}
                            position={{ base: 'absolute', lg: 'inherit' }}
                            top={2}
                            left={2}
                            variant='hCard'
                        >
                            <Icon boxSize={4} mr={{ base: 0.5, lg: 1.5 }}>
                                {iconsByTag[category[0]]}
                            </Icon>
                            <Text>{TagToName[category[0]]}</Text>
                        </Badge>
                        <ButtonGroup
                            spacing={4}
                            ml={{ base: 1, lg: 0 }}
                            mr={{ lg: 4, '2xl': 1.5 }}
                            maxH='1.5rem'
                        >
                            {bookmarks > 0 && (
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
                            )}
                            {likes > 0 && (
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
                            )}
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
                            <Highlight query={[searchString]} styles={{ color: 'lime.600' }}>
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
                        data-test-id={testI?.includes('food') ? '' : `card-link-${testI}`}
                        onClick={onClick}
                    >
                        Готовить
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
}

function RecipeCardComponent({ recipe, type, testI, onClick }: RecipeCardProps) {
    return type === 'vertical' ? (
        <VerticalRecipeCard recipe={recipe} onClick={onClick} testI={testI} />
    ) : (
        <HorizontalRecipeCard recipe={recipe} onClick={onClick} testI={testI} />
    );
}

const RecipeCard = withRecipeNavigation(RecipeCardComponent);

export default RecipeCard;
