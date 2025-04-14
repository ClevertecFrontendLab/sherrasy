import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Image, Spacer, useMediaQuery } from '@chakra-ui/react';

import DesktopLogo from '/logo.svg';
import MobileLogo from '/logo-mobile.svg';

import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Sidebar from '../sidebar/sidebar';
import UserBlock from '../user-block/user-block';

function Header() {
    const [isMobile] = useMediaQuery('(max-width: 767px)');
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');

    return (
        <Flex
            px={{ base: 3.5, xs: 4, md: 5 }}
            py={{ base: 3.5, xs: 4 }}
            bg='lime.50'
            align='center'
            data-test-id='header'
            width='100%'
            sx={{ position: 'fixed !important' }}
            top={0}
            left={0}
            right={0}
            zIndex={10}
            maxH={{ base: '4rem', lg: '5rem' }}
        >
            {isMobile ? (
                <Image src={MobileLogo} alt='yee-daa logo'></Image>
            ) : (
                <Image src={DesktopLogo} alt='yee-daa logo'></Image>
            )}
            {isDesktop && <Breadcrumbs />}
            {!isDesktop && <Sidebar />}
            <Spacer />
            {isDesktop ? <UserBlock /> : <HamburgerIcon boxSize={5} mr={3.5} />}
        </Flex>
    );
}
export default Header;
