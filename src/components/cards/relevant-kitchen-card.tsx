import {
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    HStack,
    Icon,
    Text,
} from '@chakra-ui/react';

import { BookmarkIcon, HeartEyesIcon } from '~/assets/icons/icons';
import { Recipe } from '~/types/recipe.interface';
import { TagToName } from '~/utils/constant';
import { iconsByTag } from '~/utils/iconsByTag';

type RKCardProps = {
    recipe: Recipe;
};
type RelevantKitchenCardProps = RKCardProps & {
    type: 'medium' | 'small';
};

function RKMediumCard({ recipe }: RKCardProps) {
    const { name, description, tag, bookmarks, likes } = recipe;
    return (
        <Card
            minW='14.5rem'
            maxW={{ '2xl': '20.125rem' }}
            minH={{ base: '10.5rem', lg: '11.25rem', '2xl': '12rem' }}
            maxH={{ base: '10.5rem', lg: '11.25rem', '2xl': '12rem' }}
            variant='outline'
            p={{ base: 3, lg: 3.5, '2xl': '1.375rem' }}
            pb={{ lg: 5, '2xl': '1.375rem' }}
        >
            <CardHeader p={0} pb={2}>
                <Text
                    fontSize={{ base: 'md', lg: 'xl' }}
                    lineHeight={{ base: 6, lg: 7 }}
                    fontWeight={500}
                    isTruncated
                >
                    {name}
                </Text>
            </CardHeader>
            <CardBody p={0}>
                <Text fontSize='sm' lineHeight={5} noOfLines={3}>
                    {description}
                </Text>
            </CardBody>
            <CardFooter p={0} justify={{ base: 'space-between' }} maxH='1.5rem'>
                <Badge
                    bgColor='lime.50'
                    display='flex'
                    borderRadius={2}
                    alignItems='center'
                    justifyContent='space-between'
                    py='0'
                    px={2}
                    fontSize='sm'
                    lineHeight={5}
                    fontWeight={400}
                    textTransform='none'
                >
                    <Icon boxSize={4} mr={{ base: 2, lg: 1.5 }}>
                        {iconsByTag[tag]}
                    </Icon>
                    <Text>{TagToName[tag]}</Text>
                </Badge>
                <ButtonGroup spacing={2} ml={{ base: 1, md: 0 }}>
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
            </CardFooter>
        </Card>
    );
}

function RKShortCard({ recipe }: RKCardProps) {
    const { name, tag } = recipe;
    return (
        <Card
            variant='outline'
            h='100%'
            minH={{ base: '3.25rem', md: '3rem', lg: '3.25rem', '2xl': '3.5rem' }}
            maxH={{ base: '3.25rem', md: '3rem', lg: '3.25rem', '2xl': '3.5rem' }}
            minW={{ '2xl': '41.75rem' }}
            maxW={{
                base: '20.5rem',
                sm: '100%',
                md: '14.75rem',
                lg: '17.6875rem',
                '2xl': '41.75rem',
            }}
            p={{ base: 3, md: 2, '2xl': 3 }}
            pr={{ lg: 0.5 }}
        >
            <CardBody
                p={0}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                maxH='32px'
                gap={{ lg: 6 }}
            >
                <HStack
                    py={1}
                    ml={{ lg: 2, '2xl': 3 }}
                    maxW={{ base: '70%', md: '60%', '2xl': 'max-content' }}
                >
                    {iconsByTag[tag]}
                    <Heading size={{ base: 'sm', '2xl': 'md' }} ml={{ '2xl': 1 }} p={0} isTruncated>
                        {name}
                    </Heading>
                </HStack>
                <Button
                    h='100%'
                    variant='outline'
                    color='lime.600'
                    borderColor='lime.600'
                    size={{ base: 'xs', lg: 'sm' }}
                    py={{ base: 4 }}
                    mr={{ md: 2, lg: 0 }}
                >
                    <Text fontSize={{ base: 'xs', '2xl': 'sm' }} lineHeight={4}>
                        Готовить
                    </Text>
                </Button>
            </CardBody>
        </Card>
    );
}

function RelevantKitchenCard({ recipe, type }: RelevantKitchenCardProps) {
    return type === 'medium' ? <RKMediumCard recipe={recipe} /> : <RKShortCard recipe={recipe} />;
}

export default RelevantKitchenCard;
