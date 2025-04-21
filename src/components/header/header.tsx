import { Flex, Image, Spacer, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';

import DesktopLogo from '/logo.svg';
import MobileLogo from '/logo-mobile.svg';

import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import BurgerMenu from '../burger-menu/burger-menu';
import Sidebar from '../sidebar/sidebar';
import UserBlock from '../user-block/user-block';

function Header() {
    const [isMobile] = useMediaQuery('(max-width: 767px)');
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuOpen = () => setIsMenuOpen(!isMenuOpen);
    return (
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
            zIndex={9999}
            maxH={{ base: '4rem', lg: '5rem' }}
        >
            {isMobile ? (
                <Image src={MobileLogo} alt='yee-daa logo'></Image>
            ) : (
                <Image src={DesktopLogo} alt='yee-daa logo'></Image>
            )}
            {isDesktop && <Breadcrumbs />}
            {!isDesktop && !isMenuOpen && <Sidebar />}
            <Spacer />
            {isDesktop ? <UserBlock /> : <BurgerMenu handleMenuOpen={handleMenuOpen} />}
        </Flex>
    );
}
export default Header;
