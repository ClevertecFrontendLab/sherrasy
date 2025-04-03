import { Flex, Image, Spacer, useMediaQuery } from '@chakra-ui/react';

import DesktopLogo from '/logo.svg';
import MobileLogo from '/logo-mobile.svg';

import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import UserBlock from '../user-block/user-block';

function Header() {
    const [isMobile] = useMediaQuery('(max-width: 767px)');
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');

    return (
        <Flex p={4} bg='lime.50' align='center' data-test-id='header'>
            {isMobile ? (
                <Image src={MobileLogo} alt='yee-daa logo'></Image>
            ) : (
                <Image src={DesktopLogo} alt='yee-daa logo'></Image>
            )}
            {isDesktop && <Breadcrumbs />}
            <Spacer />
            {isDesktop && <UserBlock />}
        </Flex>
    );
}
export default Header;
