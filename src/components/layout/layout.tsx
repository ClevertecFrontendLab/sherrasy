import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import { ReactNode } from 'react';

import Footer from '../footer/footer';
import Header from '../header/header';
import MenuDishes from '../menu-dishes/menu-dishes';
import Sidebar from '../sidebar/sidebar';

type LayoutProps = {
    children: ReactNode;
};

function Layout({ children }: LayoutProps) {
    const [isDesktop] = useMediaQuery('(min-width: 992px)');

    return (
        <Flex direction='column' minH='100vh'>
            <Header />
            <Flex flex={1} pt={{ base: '4rem', lg: '5rem' }} pb={{ base: '5.25rem', lg: '2rem' }}>
                {isDesktop && <MenuDishes />}
                <Box
                    flex='1'
                    overflowY='auto'
                    ml={{ base: 4, lg: '16rem' }}
                    mr={{ base: 4, lg: '17.5rem' }}
                >
                    {children}
                </Box>
                <Sidebar />
            </Flex>
            <Footer />
        </Flex>
    );
}
export default Layout;
