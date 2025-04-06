import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    HStack,
    Image,
    Stack,
    Text,
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
    return (
        <Card maxW='20.125rem' maxH='25.875rem' variant='outline'>
            <CardBody>
                <Image objectFit='cover' src={image} alt='recipe-photo' />
                <Stack mt='6' spacing='3'>
                    <Heading size='md' isTruncated>
                        {name}
                    </Heading>
                    <Text isTruncated>{description}</Text>
                </Stack>
            </CardBody>
            <CardFooter>
                <Flex w='100%' justify='space-between'>
                    <Badge bgColor='lime.150' alignContent='center' p={0}>
                        {iconsByTag[tag]} {TagToName[tag]}
                    </Badge>
                    <HStack>
                        {bookmarks > 0 && (
                            <Button
                                leftIcon={<BookmarkIcon color='black' />}
                                color='lime.600'
                                bg='transparent'
                                p={0}
                            >
                                {bookmarks}
                            </Button>
                        )}
                        {likes > 0 && (
                            <Button
                                leftIcon={<HeartEyesIcon color='black' />}
                                color='lime.600'
                                bg='transparent'
                                p={0}
                            >
                                {likes}
                            </Button>
                        )}
                    </HStack>
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
    return (
        <Card direction={{ base: 'column', sm: 'row' }} maxW='668px' variant='outline'>
            <Box position='relative' maxW='50%' maxH='100%'>
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '100%' }}
                    src={image}
                    alt='recipe-photo'
                />
                {author && (
                    <Badge bgColor='lime.150' p={0} position='absolute' bottom='10px'>
                        <Flex align='center' justify='space-evenly'>
                            <Avatar size='xs' name={name} src={author.avatar} />
                            <Text textTransform='none'>{author.name} рекомендует</Text>
                        </Flex>
                    </Badge>
                )}
            </Box>
            <Stack p={2} maxW='50%'>
                <CardBody>
                    <Flex justify='space-between'>
                        <Badge bgColor='lime.50' alignContent='center' p={0}>
                            {iconsByTag[tag]} {TagToName[tag]}
                        </Badge>
                        <HStack>
                            {bookmarks > 0 && (
                                <Button
                                    leftIcon={<BookmarkIcon color='black' />}
                                    color='lime.600'
                                    bg='transparent'
                                    p={0}
                                >
                                    {bookmarks}
                                </Button>
                            )}
                            {likes > 0 && (
                                <Button
                                    leftIcon={<HeartEyesIcon color='black' />}
                                    color='lime.600'
                                    bg='transparent'
                                    p={0}
                                >
                                    {likes}
                                </Button>
                            )}
                        </HStack>
                    </Flex>
                    <Box>
                        <Heading size='md'>{name}</Heading>
                        <Text py='2' noOfLines={3}>
                            {description}
                        </Text>
                    </Box>
                </CardBody>
                <CardFooter>
                    <Flex justify='flex-end' gap='2'>
                        <Button
                            leftIcon={<BookmarkIcon color='black' />}
                            variant='outline'
                            colorScheme='black'
                        >
                            Сохранить
                        </Button>
                        <Button variant='solid' bg='black' color='white'>
                            Готовить
                        </Button>
                    </Flex>
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
