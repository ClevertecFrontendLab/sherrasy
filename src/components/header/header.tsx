import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Image, Spacer, useMediaQuery } from '@chakra-ui/react';

import DesktopLogo from '/logo.svg';
import MobileLogo from '/logo-mobile.svg';

import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import UserBlock from '../user-block/user-block';

function Header() {
    const [isMobile] = useMediaQuery('(max-width: 767px)');
    const [isDesktop] = useMediaQuery('(min-width: 992px)');

    return (
        <Flex
            p={4}
            bg='lime.50'
            align='center'
            data-test-id='header'
            width='100%'
            position='fixed'
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
            <Spacer />
            {isDesktop ? <UserBlock /> : <HamburgerIcon boxSize={5} mr={3.5} />}
        </Flex>
    );
}
export default Header;
