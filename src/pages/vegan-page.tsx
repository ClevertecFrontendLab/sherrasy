import { Box, Flex, Heading, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import ContentFilters from '~/components/content-filters/content-filters';
import Footer from '~/components/footer/footer';
import Header from '~/components/header/header';
import MenuDishes from '~/components/menu-dishes/menu-dishes';
import data from '~/components/menu-dishes/mock-dishes.json';
import RelevantKitchenSection from '~/components/relevant-kitchen-section/relevant-kitchen-section';
import Sidebar from '~/components/sidebar/sidebar';

function VeganPage() {
    const tabsNames = data.find(({ tag }) => tag === 'vegan')?.elements || [];
    return (
        <>
            <Header />
            <Flex height='100%'>
                <MenuDishes />
                <Box width='80%'>
                    <Flex direction='column' justify='center' align='center' textAlign='center'>
                        <Heading>Веганская кухня</Heading>
                        <Text color='blackAlpha.600' w='40%' my={4}>
                            Интересны не только убеждённым вегетарианцам, но и тем, кто хочет
                            попробовать вегетарианскую диету и готовить вкусные вегетарианские
                            блюда.
                        </Text>
                        <ContentFilters />
                    </Flex>
                    <Tabs isLazy mt={5} color='lime.800'>
                        <TabList>
                            {tabsNames.map((name) => (
                                <Tab
                                    key={name}
                                    _selected={{ color: 'lime.600', borderColor: 'lime.600' }}
                                >
                                    {name}
                                </Tab>
                            ))}
                        </TabList>
                    </Tabs>
                    <RelevantKitchenSection />
                </Box>
                <Sidebar />
            </Flex>
            <Footer />
        </>
    );
}
export default VeganPage;
