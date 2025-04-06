import { Flex, Heading, Text } from '@chakra-ui/react';

import ContentFilters from '../content-filters/content-filters';

type ContentHeaderProps = {
    headline: string;
    description?: string;
};

function ContentHeader({ headline, description }: ContentHeaderProps) {
    return (
        <Flex direction='column' justify='center' align='center' textAlign='center'>
            <Heading my={4}>{headline}</Heading>
            {description && (
                <Text color='blackAlpha.600' w='40%' my={2}>
                    {description}
                </Text>
            )}
            <ContentFilters />
        </Flex>
    );
}
export default ContentHeader;
