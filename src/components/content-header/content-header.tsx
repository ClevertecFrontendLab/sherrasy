import { Flex, Heading, Text } from '@chakra-ui/react';

import ContentFilters from '../content-filters/content-filters';

type ContentHeaderProps = {
    headline: string;
    description?: string;
};

function ContentHeader({ headline, description }: ContentHeaderProps) {
    const currentBottomMargin = description ? 3 : 8;
    return (
        <Flex
            direction='column'
            justify='center'
            align='center'
            textAlign='center'
            mt={{ base: 3, xs: '1rem', lg: 8 }}
            mr={{ base: 2, xs: 0 }}
            ml={{ base: 2, xs: '0.0625rem', lg: 2 }}
        >
            <Heading
                mb={{
                    base: '13px',
                    xs: '1rem',
                    sm: '0.75rem',
                    md: '1rem',
                    lg: currentBottomMargin,
                    xl: currentBottomMargin - 1,
                    '2xl': currentBottomMargin,
                }}
                fontSize={{ base: '2xl', lg: '5xl' }}
                lineHeight={{ base: 8, lg: 'none' }}
            >
                {headline}
            </Heading>
            {description && (
                <Text
                    color='blackAlpha.600'
                    mb={{ base: '13px', xs: '1rem', lg: 8 }}
                    w={{ base: '90%', sm: '96%', lg: '50%', '2xl': '40%' }}
                    fontSize={{ base: 'sm', lg: 'md' }}
                    lineHeight={{ base: 5, lg: 6 }}
                    noOfLines={4}
                >
                    {description}
                </Text>
            )}
            <ContentFilters />
        </Flex>
    );
}
export default ContentHeader;
