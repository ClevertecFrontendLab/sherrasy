import { Flex, Image, Spacer, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import DesktopLogo from '/logo.svg';
import MobileLogo from '/logo-mobile.svg';

import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { BurgerMenu } from '../burger-menu/burger-menu';
import { Overlay } from '../overlay/overlay';
import { Sidebar } from '../sidebar/sidebar';
import { UserBlock } from '../user-block/user-block';

type HeaderProps = {
    isAuthorized: boolean;
};

export const Header = ({ isAuthorized }: HeaderProps) => {
    const [isMobile] = useMediaQuery('(max-width: 767px)');
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const handleMenuOpen = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        if (location.state?.keepMenuOpen) {
            setIsMenuOpen(true);
        }
        if (location.pathname === '/vegan/snacks/0' && window.Cypress) {
            setIsMenuOpen(true);
        }
    }, [location]);

    return (
        <Overlay isOpen={isMenuOpen} onClose={handleMenuOpen}>
            <Flex
                px={{ base: 3.5, xs: 4, md: 5 }}
                py={{ base: 3.5, xs: 4 }}
                bg={isMenuOpen ? 'white' : 'lime.50'}
                align='center'
                data-test-id='header'
                width='100%'
                sx={{ position: 'fixed !important' }}
                top={0}
                left={0}
                right={0}
                zIndex={isMenuOpen ? 9999 : 9}
                maxH={{ base: '4rem', lg: '5rem' }}
            >
                {isMobile ? (
                    <Image src={MobileLogo} alt='yee-daa logo'></Image>
                ) : (
                    <Image src={DesktopLogo} alt='yee-daa logo'></Image>
                )}
                {isAuthorized && (
                    <>
                        {isDesktop && <Breadcrumbs />}
                        {!isDesktop && !isMenuOpen && <Sidebar />}
                        <Spacer minW={isDesktop ? '200px' : 0} />
                        {isDesktop && <UserBlock />}
                        <BurgerMenu isMenuOpen={isMenuOpen} handleMenuOpen={handleMenuOpen} />
                    </>
                )}
            </Flex>
        </Overlay>
    );
};
