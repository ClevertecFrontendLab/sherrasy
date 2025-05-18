import { Center } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import { AppRoute } from '~/utils/constant';

import { Loader } from '../loader/loader';

export const OverlayWithLoader = ({ isOpen }: { isOpen: boolean }) => {
    const { pathname } = useLocation();

    const isErrorPage = pathname === AppRoute.NotFound;

    if (!isOpen || isErrorPage) return null;

    return (
        <Center
            position='fixed'
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={9999}
            backdropFilter='blur(2px)'
            bgColor='blackAlpha.300'
            display='flex'
            alignItems='center'
            justifyContent='center'
        >
            <Loader type='app' />
        </Center>
    );
};
