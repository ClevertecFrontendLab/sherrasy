import { Box, Flex, Heading } from '@chakra-ui/react';

import ContentFilters from '~/components/content-filters/content-filters';
import CookBlogSection from '~/components/cook-blog-section/cook-blog-section';
import Footer from '~/components/footer/footer';
import Header from '~/components/header/header';
import MenuDishes from '~/components/menu-dishes/menu-dishes';
import RelevantKitchenSection from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import Sidebar from '~/components/sidebar/sidebar';

function MainPage() {
    return (
        <>
            <Header />
            <Flex height='100%'>
                <MenuDishes />
                <Box width='80%'>
                    <Flex direction='column' justify='center' align='center' textAlign='center'>
                        <Heading my={5}>Приятного аппетита!</Heading>
                        <ContentFilters />
                    </Flex>
                    <CookBlogSection />
                    <RelevantKitchenSection />
                </Box>
                <Sidebar />
            </Flex>
            <Footer />
        </>
    );
}
export default MainPage;
