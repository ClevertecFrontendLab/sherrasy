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
            borderRadius={6}
            minW={{ xs: '20rem', sm: '30.625rem', lg: '36.125rem', xl: '56.125rem' }}
            maxW={{ lg: '36.125rem', xl: '56.125rem' }}
            w='98%'
            mt={{ base: 3, xs: '1rem', lg: 8 }}
            mr={{ base: 0, xs: 0 }}
            ml={{ base: 0, xs: '0.0625rem', lg: 2 }}
            sx={{
                '&:has(:focus, :active)': {
                    boxShadow:
                        '0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                },
            }}
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
                    w={{ base: '90%', sm: '96%', lg: '90%' }}
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
