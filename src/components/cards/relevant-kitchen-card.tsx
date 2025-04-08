import {
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
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
            minH={{ base: '10.5rem', lg: '11.25rem', '2xl': '12rem' }}
            maxH={{ base: '10.5rem', lg: '11.25rem', '2xl': '12rem' }}
            variant='outline'
        >
            <CardHeader p={{ base: 3, lg: 4 }} pb={1}>
                <Text
                    mt='1px'
                    size={{ base: 'md', lg: 'xl' }}
                    lineHeight={{ base: 6, lg: 7 }}
                    isTruncated
                >
                    {name}
                </Text>
            </CardHeader>
            <CardBody px={2.5} pt={1} pb={2}>
                <Text
                    noOfLines={3}
                    fontSize={{ base: 'xs', lg: 'sm' }}
                    lineHeight={5}
                    letterSpacing={1.1}
                >
                    {description}
                </Text>
            </CardBody>
            <CardFooter pr={3}>
                <Flex w='100%' justify='space-between'>
                    <Badge
                        bgColor='lime.50'
                        display='flex'
                        h='1.5rem'
                        borderRadius={2}
                        alignItems='center'
                        justifyContent='space-between'
                        py='1px'
                        px={0}
                        fontSize='sm'
                        lineHeight={5}
                        fontWeight={400}
                        textTransform='none'
                    >
                        <Icon boxSize={4} mb='3px' mr={2}>
                            {iconsByTag[tag]}
                        </Icon>
                        <Text>{TagToName[tag]}</Text>
                    </Badge>
                    <ButtonGroup spacing={2} ml={{ base: 1, lg: 0 }} maxH='1.5rem'>
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
            </CardFooter>
        </Card>
    );
}

function RKShortCard({ recipe }: RKCardProps) {
    const { name, tag } = recipe;
    return (
        <Card
            variant='outline'
            minH={{ base: '3.25rem', '2xl': '3.5rem' }}
            maxH={{ base: '3.25rem', '2xl': '3.5rem' }}
        >
            <CardBody p={1}>
                <Flex justify='space-between'>
                    <HStack width='70%'>
                        {iconsByTag[tag]}
                        <Heading size='sm' isTruncated>
                            {name}
                        </Heading>
                    </HStack>
                    <Button variant='outline' color='lime.600' borderColor='lime.600'>
                        Готовить
                    </Button>
                </Flex>
            </CardBody>
        </Card>
    );
}

function RelevantKitchenCard({ recipe, type }: RelevantKitchenCardProps) {
    return type === 'medium' ? <RKMediumCard recipe={recipe} /> : <RKShortCard recipe={recipe} />;
}

export default RelevantKitchenCard;
