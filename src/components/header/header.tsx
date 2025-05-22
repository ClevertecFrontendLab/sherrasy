import { Center, Flex, Image, Spacer, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { TestIdName } from '~/utils/constant';

import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { BurgerMenu } from '../burger-menu/burger-menu';
import { Overlay } from '../overlay/overlay';
import { SidebarMobile } from '../sidebar/sidebar';
import { UserBlock } from '../user-block/user-block';

export const Header = () => {
    const [isMobile] = useMediaQuery('(max-width: 767px)');
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const handleMenuOpen = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        if (location.state?.keepMenuOpen) {
            setIsMenuOpen(true);
        }
    }, [location]);

    return (
        <Overlay isOpen={isMenuOpen} onClose={handleMenuOpen}>
            <Center
                width='100%'
                sx={{ position: 'fixed !important' }}
                left={0}
                top={0}
                bgColor={isMenuOpen ? 'white' : 'lime.50'}
                zIndex={isMenuOpen ? 9999 : 9}
                maxH={{ base: '4rem', lg: '5rem' }}
                px={{ base: 3.5, xs: 4, md: 5 }}
                py={{ base: 3.5, xs: 4 }}
            >
                <Flex align='center' data-test-id={TestIdName.Header} width='100%' maxW='1920px'>
                    {isMobile ? (
                        <Image src='/logo-mobile.svg' alt='yee-daa logo'></Image>
                    ) : (
                        <Image src='/logo.svg' alt='yee-daa logo'></Image>
                    )}
                    {isDesktop && <Breadcrumbs />}
                    <Spacer minW={isDesktop ? '200px' : 0} />
                    {!isDesktop && !isMenuOpen && <SidebarMobile />}
                    {isDesktop && <UserBlock />}
                    <BurgerMenu isMenuOpen={isMenuOpen} handleMenuOpen={handleMenuOpen} />
                </Flex>
            </Center>
        </Overlay>
    );
};
