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
    Icon,
    Image,
    Stack,
    Text,
    useMediaQuery,
} from '@chakra-ui/react';

import { BookmarkIcon, HeartEyesIcon } from '~/assets/icons/icons';
import { RecipeWithImage } from '~/types/recipe.interface';
import { TagToName } from '~/utils/constant';
import { iconsByTag } from '~/utils/iconsByTag';

import { cookBlog } from '../mock-cards.json';

type CardProps = {
    recipe: RecipeWithImage;
};
type RecipeCardProps = CardProps & {
    type: 'horizontal' | 'vertical';
};

function VerticalRecipeCard({ recipe }: CardProps) {
    const { title, image, description, tag, bookmarks, likes } = recipe;
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    return (
        <Card
            minW={['9.3125rem', '9.875rem', '9.75rem', '9.875rem', '17.4375rem', null, '20.125rem']}
            maxW={['9.3125rem', '9.875rem', '9.75rem', '9.875rem', '17.4375rem', null, '20.125rem']}
            minH={['13rem', '13.75rem', '13.5rem', '13.75rem', '25.125rem', null, '25.875rem']}
            maxH={['13rem', '13.75rem', '13.5rem', '13.75rem', '25.125rem', null, '25.875rem']}
            position='relative'
            variant='outline'
        >
            <CardBody p={0}>
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
                        isTruncated={isDesktop}
                        noOfLines={{ base: 2, lg: 1 }}
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
            <CardFooter
                px={{ base: 1.5, xs: 2, lg: 3, '2xl': '22px' }}
                py={{ base: 0, lg: 1.5, '2xl': 3 }}
            >
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
                            {iconsByTag[tag]}
                        </Icon>
                        {TagToName[tag]}
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

function HorizontalRecipeCard({ recipe }: CardProps) {
    const { title, image, description, tag, bookmarks, likes, recommendedBy } = recipe;
    const author = recommendedBy
        ? cookBlog.find((item) => item.id === recommendedBy) || null
        : null;
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    return (
        <Card
            minH={{ base: '7.75rem', xs: '8rem', md: '8.0625rem', lg: '15.25rem' }}
            maxH={{ base: '7.75rem', xs: '8rem', md: '8.0625rem', lg: '15.25rem' }}
            minW={['19.375rem', '20.5rem', '21.75rem', '22.25rem', '55rem', null, '41.75rem']}
            maxW={['19.375rem', '20.5rem', '21.75rem', '22.25rem', '55rem', null, '41.75rem']}
            direction='row'
            variant='outline'
        >
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
                <CardBody py={{ base: 2, lg: 1 }} px={0} minW='10.1875rem'>
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
                                {iconsByTag[tag]}
                            </Icon>
                            <Text>{TagToName[tag]}</Text>
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
                            {title}
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
                <CardFooter
                    justifyContent='flex-end'
                    gap={{ base: 2, xs: 3, sm: 7, md: 3, lg: 2 }}
                    py={0}
                    px={{ base: 3, xs: '10px', sm: 2, lg: 3, '2xl': 0 }}
                    pr={{ base: 4, xs: '10px' }}
                    pb={{ lg: 1, '2xl': 0.5 }}
                >
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
                    >
                        Готовить
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
}

function RecipeCard({ recipe, type }: RecipeCardProps) {
    return type === 'vertical' ? (
        <VerticalRecipeCard recipe={recipe} />
    ) : (
        <HorizontalRecipeCard recipe={recipe} />
    );
}

export default RecipeCard;
