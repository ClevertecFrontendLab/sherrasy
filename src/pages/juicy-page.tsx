import { Box, Flex, Heading } from '@chakra-ui/react';

import ContentFilters from '~/components/content-filters/content-filters';
import Footer from '~/components/footer/footer';
import Header from '~/components/header/header';
import RelevantKitchenSection from '~/components/relevant-kitchen-section/relevant-kitchen-section';

function JuicyPage() {
    return (
        <>
            <Header />
            <Box width='80%'>
                <Flex direction='column' justify='center' textAlign='center'>
                    <Heading>Самое сочное</Heading>
                    <ContentFilters />
                </Flex>
                <RelevantKitchenSection />
            </Box>
            <Footer />
        </>
    );
}
export default JuicyPage;
