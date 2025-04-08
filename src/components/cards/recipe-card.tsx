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

import { cookBlog } from './mock-cards.json';

type CardProps = {
    recipe: RecipeWithImage;
};
type RecipeCardProps = CardProps & {
    type: 'horizontal' | 'vertical';
};

function VerticalRecipeCard({ recipe }: CardProps) {
    const { name, image, description, tag, bookmarks, likes } = recipe;
    const [isDesktop] = useMediaQuery('(min-width: 992px)');
    return (
        <Card
            minW={{ base: '9.875rem', lg: '17.4375rem', '2xl': '20.125rem' }}
            maxW={{ base: '9.875rem', lg: '17.4375rem', '2xl': '20.125rem' }}
            minH={{ base: '13.75rem', lg: '25.125rem', '2xl': '25.875rem' }}
            maxH={{ base: '13.75rem', lg: '25.125rem', '2xl': '25.875rem' }}
            position='relative'
            variant='outline'
        >
            <CardBody p={0}>
                <Image
                    objectFit='cover'
                    src={image}
                    alt='recipe-photo'
                    width='100%'
                    h={{ base: '8rem', lg: '14.375rem' }}
                    borderTopLeftRadius={{ base: 'md', md: 'lg' }}
                    borderTopRightRadius={{ base: 'md', md: 'lg' }}
                />
                <Stack mt='0.25rem' spacing='3' px={2} py={1}>
                    <Text
                        isTruncated={isDesktop}
                        noOfLines={{ base: 2, lg: 1 }}
                        fontWeight={500}
                        fontSize={{ base: 'md', lg: 'lg' }}
                        lineHeight={{ base: 6, lg: 7 }}
                    >
                        {name}
                    </Text>
                    {isDesktop && <Text noOfLines={3}>{description}</Text>}
                </Stack>
            </CardBody>
            <CardFooter px={2} py={0}>
                <Flex w='100%' justify='space-between'>
                    <Badge
                        h='1.5rem'
                        borderRadius={2}
                        bgColor='lime.150'
                        alignContent='center'
                        py='0.0625rem'
                        px='0.25rem'
                        position={{ base: 'absolute', lg: 'inherit' }}
                        top={2}
                        left={2}
                        fontSize='sm'
                        lineHeight={5}
                        fontWeight={400}
                        textTransform='none'
                    >
                        <Icon boxSize={4} mb='3px' mr='1px'>
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
    const { name, image, description, tag, bookmarks, likes, recommendedBy } = recipe;
    const author = recommendedBy
        ? cookBlog.find((item) => item.id === recommendedBy) || null
        : null;
    const [isDesktop] = useMediaQuery('(min-width: 992px)');
    return (
        <Card
            minH={{ base: '8rem', lg: '15.25rem' }}
            maxH={{ base: '8rem', lg: '15.25rem' }}
            direction='row'
            variant='outline'
        >
            <Box position='relative' maxW='50%' maxH='100%'>
                <Image
                    objectFit='cover'
                    src={image}
                    alt='recipe-photo'
                    width='100%'
                    maxW={{ base: '9.875rem', lg: '21.625rem' }}
                    h='100%'
                    borderTopLeftRadius={{ base: 'md', md: 'lg' }}
                    borderBottomLeftRadius={{ base: 'md', md: 'lg' }}
                />
                {author && (
                    <Badge
                        bgColor='lime.150'
                        p={0}
                        position='absolute'
                        bottom='10px'
                        display={{ base: 'none', lg: 'unset' }}
                    >
                        <Flex align='center' justify='space-evenly'>
                            <Avatar size='xs' name={name} src={author.avatar} />
                            <Text textTransform='none'>{author.name} рекомендует</Text>
                        </Flex>
                    </Badge>
                )}
            </Box>
            <Stack spacing='3' py={1} pr={0} pl={2} maxW='50%'>
                <CardBody py={2} px={0} minW='163px'>
                    <Flex justify='space-between'>
                        <Badge
                            display='flex'
                            bgColor='lime.50'
                            h='1.5rem'
                            borderRadius={2}
                            alignContent='center'
                            py='1px'
                            px='4px'
                            position={{ base: 'absolute', lg: 'inherit' }}
                            top={2}
                            left={2}
                            fontSize='sm'
                            lineHeight={5}
                            fontWeight={400}
                            textTransform='none'
                        >
                            <Icon boxSize={4} mb='3px' mr={0.5}>
                                {iconsByTag[tag]}
                            </Icon>
                            <Text>{TagToName[tag]}</Text>
                        </Badge>
                        <ButtonGroup spacing={4} ml={{ base: 1, lg: 0 }} maxH='1.5rem'>
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
                    <Box mt={1}>
                        <Text
                            size='md'
                            isTruncated={isDesktop}
                            noOfLines={{ base: 2, lg: 1 }}
                            fontWeight={500}
                            fontSize={{ base: 'md', lg: 'lg' }}
                            lineHeight={{ base: 6, lg: 7 }}
                        >
                            {name}
                        </Text>
                        {isDesktop && <Text noOfLines={{ lg: 2, '2xl': 3 }}>{description}</Text>}
                    </Box>
                </CardBody>
                <CardFooter justifyContent='flex-end' gap={2.5} p={0} pr={0.5}>
                    <Button
                        variant='outline'
                        colorScheme='black'
                        size={{ base: 'xs', lg: 'sm' }}
                        w={[4, 'initial']}
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
