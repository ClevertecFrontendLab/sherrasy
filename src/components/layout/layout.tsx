import { Flex, useMediaQuery } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useLocation } from 'react-router';

import { AppRoute } from '~/utils/constant';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { MenuDishes } from '../menu-dishes/menu-dishes';
import { Sidebar } from '../sidebar/sidebar';

type LayoutProps = {
    children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const { pathname } = useLocation();
    const isAuthorized = pathname !== AppRoute.NotFound;
    return (
        <Flex direction='column' minH='100vh' maxH='100vh'>
            <Header isAuthorized={isAuthorized} />
            <Flex flex={1} pt={{ base: '4rem', lg: '5rem' }} pb={{ base: '5.25rem', lg: '2rem' }}>
                {isDesktop && isAuthorized && <MenuDishes isBurgerMenu={false} />}
                <Flex
                    flex='1'
                    direction='column'
                    alignItems='center'
                    overflowY='auto'
                    mb={{ base: 4, md: 0, lg: '0' }}
                    w='100%'
                    maxW='100%'
                    overflowX='hidden'
                >
                    {children}
                </Flex>
                {isDesktop && isAuthorized && <Sidebar />}
            </Flex>
            <Footer />
        </Flex>
    );
};
