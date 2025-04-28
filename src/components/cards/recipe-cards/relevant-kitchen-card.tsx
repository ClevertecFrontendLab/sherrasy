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
import { FullRecipe } from '~/types/recipe.interface';
import { TagToName } from '~/utils/constant';
import { iconsByTag } from '~/utils/iconsByTag';

type RKCardProps = {
    recipe: FullRecipe;
};
type RelevantKitchenCardProps = RKCardProps & {
    type: 'medium' | 'small';
};

const RKMediumCard = ({ recipe }: RKCardProps) => {
    const { title, description, category, bookmarks, likes } = recipe;
    return (
        <Card variant='rkMedium'>
            <CardHeader>
                <Text
                    fontSize={{ base: 'md', lg: 'xl' }}
                    lineHeight={{ base: 6, lg: 7 }}
                    fontWeight={500}
                    isTruncated
                >
                    {title}
                </Text>
            </CardHeader>
            <CardBody>
                <Text fontSize='sm' lineHeight={5} noOfLines={3}>
                    {description}
                </Text>
            </CardBody>
            <CardFooter position='relative'>
                <Badge py={{ base: 1, md: 0 }} px={2} variant='rkCard' maxW='140px'>
                    <Icon boxSize={4} mr={{ base: 2, lg: 1.5 }}>
                        {iconsByTag[category[0]]}
                    </Icon>
                    <Text isTruncated>{TagToName[category[0]]}</Text>
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
};

const RKShortCard = ({ recipe }: RKCardProps) => {
    const { title, category } = recipe;
    return (
        <Card variant='rkShort'>
            <CardBody position='relative'>
                <HStack
                    py={1}
                    ml={{ '2xl': 3 }}
                    maxW={{
                        base: 'calc(100% - 74px)',
                        lg: 'calc(100% - 80px)',
                        '2xl': 'calc(100% - 150px)',
                    }}
                >
                    {iconsByTag[category[0]]}
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
};

export const RelevantKitchenCard = ({ recipe, type }: RelevantKitchenCardProps) =>
    type === 'medium' ? <RKMediumCard recipe={recipe} /> : <RKShortCard recipe={recipe} />;
