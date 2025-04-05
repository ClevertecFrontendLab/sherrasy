import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    HStack,
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
        <Card maxW='20.125rem' maxH='12rem' variant='outline'>
            <CardHeader>
                <Heading size='sm' isTruncated>
                    {name}
                </Heading>
            </CardHeader>
            <CardBody>
                <Text isTruncated>{description}</Text>
            </CardBody>
            <CardFooter>
                <Flex w='100%' justify='space-between'>
                    <Badge bgColor='lime.50' alignContent='center' p={0}>
                        {iconsByTag[tag]} {TagToName[tag]}
                    </Badge>
                    <HStack>
                        <Button
                            leftIcon={<BookmarkIcon color='black' />}
                            color='lime.600'
                            bg='transparent'
                            p={0}
                        >
                            {bookmarks}
                        </Button>
                        <Button
                            leftIcon={<HeartEyesIcon color='black' />}
                            color='lime.600'
                            bg='transparent'
                            p={0}
                        >
                            {likes}
                        </Button>
                    </HStack>
                </Flex>
            </CardFooter>
        </Card>
    );
}

function RKShortCard({ recipe }: RKCardProps) {
    const { name, tag } = recipe;
    return (
        <Card variant='outline' w='41.75rem' maxH='3.5rem'>
            <CardBody p={1}>
                <Flex justify='space-between'>
                    <HStack>
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
