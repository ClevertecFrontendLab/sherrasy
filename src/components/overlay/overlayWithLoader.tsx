import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { Loader } from '../loader/loader';

export const OverlayWithLoader = ({ isOpen }: { isOpen: boolean }) => {
    const scrollPosition = useRef(0);

    useEffect(() => {
        if (isOpen) {
            scrollPosition.current = window.scrollY;

            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition.current}px`;
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';

            window.scrollTo(0, scrollPosition.current);
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollPosition.current);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Box
            position='fixed'
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex='overlay'
            backdropFilter='blur(2px)'
            bgColor='blackAlpha.300'
            display='flex'
            alignItems='center'
            justifyContent='center'
        >
            <Loader type='app' />
        </Box>
    );
};
