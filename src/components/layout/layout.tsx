import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import Footer from '../footer/footer';
import Header from '../header/header';
import MenuDishes from '../menu-dishes/menu-dishes';
import Sidebar from '../sidebar/sidebar';

type LayoutProps = {
    children: ReactNode;
};

function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <Flex height='100%'>
                <MenuDishes />
                <Box width='80%'>{children}</Box>
                <Sidebar />
            </Flex>
            <Footer />
        </>
    );
}
export default Layout;
