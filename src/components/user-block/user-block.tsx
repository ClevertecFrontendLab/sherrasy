import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';

export const UserBlock = () => {
    const name = 'Екатерина Константинопольская';
    return (
        <HStack spacing={2} align='center' mr='40px'>
            <Avatar name={name} size={{ base: 'sm', sm: 'md' }} src='/photo-dekstop.jpg' />
            <VStack align='start' spacing={0}>
                <Text
                    fontSize={{ base: 'sm', sm: 'lg' }}
                    fontWeight={500}
                    lineHeight={{ base: 6, sm: 7 }}
                    letterSpacing='-0.0313rem'
                >
                    {name}
                </Text>
                <Text fontSize='sm' lineHeight={5} color='blackAlpha.700'>
                    @bake_and_pie
                </Text>
            </VStack>
        </HStack>
    );
};
