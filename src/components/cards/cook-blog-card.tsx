import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';

import { Author } from '~/types/author.interface';

type CookCookBlogCardProps = {
    author: Author;
};

function CookBlogCard({ author }: CookCookBlogCardProps) {
    const { avatar, name, description, nick } = author;
    console.log(avatar);
    return (
        <Card>
            <CardHeader>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar name={name} src={avatar} />
                    <Box>
                        <Heading size='sm'>{name}</Heading>
                        <Text>{nick}</Text>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>{description}</Text>
            </CardBody>
        </Card>
    );
}
export default CookBlogCard;
