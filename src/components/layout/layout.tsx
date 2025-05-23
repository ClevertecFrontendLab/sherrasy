import { Center, Flex, useMediaQuery } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { useGetCategoriesQuery } from '~/query/services/categories';
import { getAppLoading } from '~/store/app-status/selectors';
import { useAppSelector } from '~/store/hooks';

import { AlertToastContainer } from '../alert-error/alert-toast-container';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { MenuDishes } from '../menu-dishes/menu-dishes';
import { OverlayWithLoader } from '../overlay/overlayWithLoader';
import { Sidebar } from '../sidebar/sidebar';

type LayoutProps = PropsWithChildren;

export const Layout = ({ children }: LayoutProps) => {
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const { isFetching: isCatLoading } = useGetCategoriesQuery();
    const isLoading = useAppSelector(getAppLoading);
    return (
        <>
            <OverlayWithLoader isOpen={isCatLoading || isLoading} />
            <Flex direction='column' align='center' minH='100vh' maxH='100vh' maxW='100%'>
                <Header />
                <Center maxW='1920px' w='100%' position='relative'>
                    <Flex
                        flex={1}
                        pt={{ base: '4rem', lg: '5rem' }}
                        pb={{ base: '5.25rem', lg: '2rem' }}
                        maxW='1920px'
                        justify='center'
                        w='100%'
                    >
                        {isDesktop && <MenuDishes isBurgerMenu={false} />}

                        <Flex
                            flex='1'
                            direction='column'
                            align='center'
                            overflowY='auto'
                            mb={{ base: 4, md: 0, lg: '0' }}
                            w='100%'
                            maxW={{
                                base: '100%',
                                md: '767px',
                                lg: '920px',
                                xl: '1160px',
                                '2xl': '1380px',
                            }}
                            overflowX='hidden'
                            position='relative'
                        >
                            {children}
                        </Flex>

                        {isDesktop && <Sidebar />}
                    </Flex>
                </Center>
                <AlertToastContainer />
                <Footer />
            </Flex>
        </>
    );
};
