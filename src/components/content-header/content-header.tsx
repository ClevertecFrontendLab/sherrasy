import { Flex, Heading, Text } from '@chakra-ui/react';

import ContentFilters from '../content-filters/content-filters';

type ContentHeaderProps = {
    headline: string;
    description?: string;
};

function ContentHeader({ headline, description }: ContentHeaderProps) {
    return (
        <Flex direction='column' justify='center' align='center' textAlign='center'>
            <Heading
                mt={{ base: '1rem', lg: 4 }}
                mb={{ base: '1rem', lg: 4 }}
                ml={{ base: '0.0625rem', lg: 4 }}
                fontSize={{ base: '2xl', lg: '5xl' }}
                lineHeight={{ base: 8, lg: 'none' }}
            >
                {headline}
            </Heading>
            {description && (
                <Text
                    color='blackAlpha.600'
                    mb={4}
                    w={{ base: '90%', '2xl': '50%' }}
                    fontSize={{ base: 'sm', lg: 'md' }}
                    lineHeight={{ base: 5, lg: 6 }}
                >
                    {description}
                </Text>
            )}
            <ContentFilters />
        </Flex>
    );
}
export default ContentHeader;
