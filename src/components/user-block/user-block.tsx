import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

function UserBlock() {
    const name = 'Екатерина Константинопольская';
    return (
        <Flex gap={3} mr='56px'>
            <Avatar name={name} src='/photo-dekstop.jpg' />
            <Box>
                <Text fontSize='lg' fontFamily='Inter'>
                    {name}
                </Text>
                <Text color='gray'>@bake_and_pie</Text>
            </Box>{' '}
        </Flex>
    );
}
export default UserBlock;
