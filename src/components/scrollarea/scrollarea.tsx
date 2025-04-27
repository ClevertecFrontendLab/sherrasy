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
    return (
        <Box
            sx={ScrollAreaStyles}
            maxH={extraStylesType === 'multiselect' ? '320px' : undefined}
            pr={0}
            mt={extraStylesType === 'menu' ? { lg: 9, xl: 8, '2xl': 9 } : 0}
        >
            {children}
        </Box>
    );
}

export default ScrollArea;
