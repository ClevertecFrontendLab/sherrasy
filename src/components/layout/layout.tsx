import { Flex, useMediaQuery } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useGetCategoriesQuery } from '~/query/services/categories';
import { getAppLoading } from '~/store/app-status/selectors';
import { useAppSelector } from '~/store/hooks';

import { AlertToastContainer } from '../alert-error/alert-toast-container';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { MenuDishes } from '../menu-dishes/menu-dishes';
import { OverlayWithLoader } from '../overlay/overlayWithLoader';
import { Sidebar } from '../sidebar/sidebar';

type LayoutProps = {
    children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const { isFetching: isCatLoading } = useGetCategoriesQuery();
    const isLoading = useAppSelector(getAppLoading);
    return (
        <>
            <OverlayWithLoader isOpen={isCatLoading || isLoading} />
            <Flex direction='column' minH='100vh' maxH='100vh'>
                <Header />
                <Flex
                    flex={1}
                    pt={{ base: '4rem', lg: '5rem' }}
                    pb={{ base: '5.25rem', lg: '2rem' }}
                >
                    {isDesktop && <MenuDishes isBurgerMenu={false} />}
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
                    {isDesktop && <Sidebar />}
                </Flex>
                <AlertToastContainer />
                <Footer />
            </Flex>
        </>
    );
};
