import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

function UserBlock() {
    const name = 'Екатерина Константинопольская';
    return (
        <Flex gap={3} mr='4rem' align='center'>
            <Avatar name={name} src='/photo-dekstop.jpg' />
            <Box>
                <Text fontSize='lg' fontFamily='Inter'>
                    {name}
                </Text>
                <Text fontSize='sm' lineHeight={5} color='blackAlpha.700'>
                    @bake_and_pie
                </Text>
            </Box>
        </Flex>
    );
}
export default UserBlock;
