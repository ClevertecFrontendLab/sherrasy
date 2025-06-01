import { Image, useMediaQuery } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import logo from '~/assets/images/logo/logo.svg';
import logoMobile from '~/assets/images/logo/logo-mobile.svg';
import { AppRoute } from '~/utils/constant';
import { TestIdName } from '~/utils/testId-name.enum';

export const Logo = () => {
    const [isMobile] = useMediaQuery('(max-width: 767px)');
    const navigate = useNavigate();
    const handleLogoClick = () => navigate(AppRoute.Main);
    return (
        <>
            <Image
                src={isMobile ? logoMobile : logo}
                alt='yee-daa logo'
                onClick={handleLogoClick}
                _hover={{ cursor: 'pointer' }}
                data-test-id={TestIdName.HeaderLogo}
            ></Image>
        </>
    );
};
