import { Flex, Heading } from '@chakra-ui/react';

import Footer from '~/components/footer/footer';
import Header from '~/components/header/header';
import MenuDishes from '~/components/menu-dishes/menu-dishes';

function MainPage() {
    return (
        <>
            <Header />
            <Flex height='100%'>
                <MenuDishes />
                <Heading>Главная</Heading>
            </Flex>

            <Footer />
        </>
    );
}
export default MainPage;
