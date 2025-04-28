import { Box } from '@chakra-ui/react';
import React from 'react';

interface ScrollAreaProps {
    children: React.ReactNode;
    extraStylesType: string;
}

const ScrollAreaStyles = {
    overflow: 'auto',
    scrollbarWidth: '6px',
    scrollbarColor: 'blackAlpha.50 blackAlpha.50',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        bg: 'blackAlpha.300',
        borderRadius: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'blackAlpha.50',
        borderRadius: '8px',
    },
};

function ScrollArea({ children, extraStylesType }: ScrollAreaProps) {
    const maxHeightValue: { [key: string]: string } = {
        multiselect: '320px',
        'drawer-filters': 'calc( 100vh - 96px)',
    };
    return (
        <Box
            sx={ScrollAreaStyles}
            maxH={maxHeightValue[extraStylesType] ? maxHeightValue[extraStylesType] : undefined}
            pr={0}
            mt={extraStylesType === 'menu' ? { lg: 9, xl: 8, '2xl': 9 } : 0}
        >
            {children}
        </Box>
    );
}

export default ScrollArea;
