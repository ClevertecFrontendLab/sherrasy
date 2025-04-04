import { Flex, Heading } from '@chakra-ui/react';

import Footer from '~/components/footer/footer';
import Header from '~/components/header/header';
import MenuDishes from '~/components/menu-dishes/menu-dishes';
import Sidebar from '~/components/sidebar/sidebar';

function MainPage() {
    return (
        <>
            <Header />
            <Flex height='100%'>
                <MenuDishes />
                <Heading>Главная</Heading>
                <Sidebar />
            </Flex>

            <Footer />
        </>
    );
}
export default MainPage;
