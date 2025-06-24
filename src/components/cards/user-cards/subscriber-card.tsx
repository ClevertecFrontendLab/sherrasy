import { Avatar, Card, CardBody, Flex, Heading, Text, VStack } from '@chakra-ui/react';

import { BloggerShort } from '~/types/blogger.type';
import { getBloggerCardName } from '~/utils/helpers/blogger-author-helpers';
import { updateImagePath } from '~/utils/helpers/format-images';

export const SubscriberCard = ({ user }: { user: BloggerShort }) => {
    const { firstName = '', lastName = '', login = '', photo = '' } = user;
    const name = getBloggerCardName(firstName, lastName);

    return (
        <Card minW={{ base: '20.5rem', sm: '22.4375rem', lg: '27rem', xl: '27.8125rem' }}>
            <CardBody p='1rem 1.5rem'>
                <Flex gap='3' alignItems='center'>
                    <Avatar name={name} src={updateImagePath(photo)} size='md' />
                    <VStack alignItems='start'>
                        <Heading size='md' fontWeight={500} noOfLines={1}>
                            {name}
                        </Heading>
                        <Text size='sm' color='blackAlpha.700'>
                            @{login}
                        </Text>
                    </VStack>
                </Flex>
            </CardBody>
        </Card>
    );
};
