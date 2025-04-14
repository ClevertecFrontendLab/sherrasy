import { Box } from '@chakra-ui/react';
import React from 'react';

interface ScrollAreaProps {
    children: React.ReactNode;
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

function ScrollArea({ children }: ScrollAreaProps) {
    return (
        <Box sx={ScrollAreaStyles} pr={0} mt={{ lg: 9, xl: 8, '2xl': 9 }}>
            {children}
        </Box>
    );
}

export default ScrollArea;
