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
    Spacer,
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
    const { title, description, tag, bookmarks, likes } = recipe;
    return (
        <Card
            minW={{ base: '19.375rem', xs: '20.5rem', sm: '14.25rem', md: '14.5rem' }}
            maxW={{
                base: '19.375rem',
                xs: '20.5rem',
                sm: '14.25rem',
                md: '14.5rem',
                lg: '17.625rem',
                '2xl': '20.125rem',
            }}
            minH={{
                base: '10rem',
                xs: '10.5rem',
                sm: '10.25rem',
                md: '10.5rem',
                lg: '11.25rem',
                '2xl': '12rem',
            }}
            maxH={{
                base: '10rem',
                xs: '10.5rem',
                sm: '10.25rem',
                md: '10.5rem',
                lg: '11.25rem',
                '2xl': '12rem',
            }}
            variant='outline'
            p={{ base: 2.5, xs: 3, lg: 3.5, '2xl': '1.375rem' }}
            pb={{ lg: '1rem', '2xl': '1.375rem' }}
        >
            <CardHeader p={0} pb={2}>
                <Text
                    fontSize={{ base: 'md', lg: 'xl' }}
                    lineHeight={{ base: 6, lg: 7 }}
                    fontWeight={500}
                    isTruncated
                >
                    {title}
                </Text>
            </CardHeader>
            <CardBody p={0}>
                <Text fontSize='sm' lineHeight={5} noOfLines={3}>
                    {description}
                </Text>
            </CardBody>
            <CardFooter
                p={0}
                pb={{ md: 0.5 }}
                justify={{ base: 'space-between' }}
                maxH='1.5rem'
                position='relative'
            >
                <Badge py={{ base: 1, md: 0 }} px={2} variant='rkCard'>
                    <Icon boxSize={4} mr={{ base: 2, lg: 1.5 }}>
                        {iconsByTag[tag]}
                    </Icon>
                    <Text>{TagToName[tag]}</Text>
                </Badge>
                <Spacer />
                <ButtonGroup
                    spacing={{ base: 2, sm: 0, lg: 2 }}
                    ml={{ base: 1, md: 0 }}
                    mr={{ base: 3, sm: 2, lg: 3 }}
                    gap={0}
                    position='absolute'
                    bottom='3px'
                    right='-12px'
                >
                    {bookmarks > 0 && (
                        <Button
                            color='lime.600'
                            bg='transparent'
                            p={0}
                            size='sm'
                            fontSize='xs'
                            lineHeight={4}
                            iconSpacing='0.375rem'
                            h='100%'
                        >
                            <BookmarkIcon
                                mr={{ base: 1, sm: 0.5, lg: 1 }}
                                color='black'
                                boxSize={{ base: 3 }}
                            />
                            {bookmarks}
                        </Button>
                    )}
                    {likes > 0 && (
                        <Button
                            color='lime.600'
                            bg='transparent'
                            p={0}
                            size='sm'
                            fontSize='xs'
                            lineHeight={4}
                            iconSpacing='0.375rem'
                            h='100%'
                        >
                            <HeartEyesIcon
                                mr={{ base: 1, sm: 0.5, lg: 1 }}
                                color='black'
                                boxSize={{ base: 3 }}
                            />
                            {likes}
                        </Button>
                    )}
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}

function RKShortCard({ recipe }: RKCardProps) {
    const { title, tag } = recipe;
    return (
        <Card
            variant='outline'
            h='100%'
            minH={{ base: '3rem', xs: '3.25rem', md: '3.125rem', lg: '3.25rem', '2xl': '3.5rem' }}
            maxH={{ base: '3rem', xs: '3.25rem', md: '3.125rem', lg: '3.25rem', '2xl': '3.5rem' }}
            minW={{ '2xl': '41.75rem' }}
            maxW={{
                base: '19.375rem',
                xs: '20.5rem',
                sm: '14.5rem',
                md: '14.875rem',
                lg: '17.6875rem',
                '2xl': '41.75rem',
            }}
            p={{ base: 2.5, xs: 3, '2xl': 3 }}
            pr={{ lg: 0.5 }}
        >
            <CardBody
                p={0}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                maxH='32px'
                gap={{ base: 2, xs: 1, lg: 0 }}
                pb={{ base: 2, xs: 1.5 }}
                position='relative'
            >
                <HStack
                    py={1}
                    ml={{ '2xl': 3 }}
                    maxW={{
                        base: 'calc(100% - 74px)',
                        lg: 'calc(100% - 80px)',
                        '2xl': 'max-content',
                    }}
                >
                    {iconsByTag[tag]}
                    <Heading
                        size={{ base: 'sm', '2xl': 'md' }}
                        ml={{ lg: 0.5, '2xl': 1 }}
                        p={0}
                        isTruncated
                    >
                        {title}
                    </Heading>
                </HStack>
                <Spacer />
                <Button
                    maxH='32px'
                    minW={{ base: '70px', '2xl': '87px' }}
                    maxW={{ base: '70px', '2xl': '87px' }}
                    variant='outline'
                    color='lime.600'
                    borderColor='lime.600'
                    py={{ base: 4 }}
                    right={{ base: 0, lg: 2 }}
                    position='absolute'
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
