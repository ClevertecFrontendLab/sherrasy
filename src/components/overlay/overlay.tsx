import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

export const Overlay = ({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return children;

    return (
        <Box
            position='fixed'
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex='9'
            backdropFilter='blur(2px)'
            bgColor='blackAlpha.300'
            display='flex'
            alignItems='center'
            justifyContent='center'
            onClick={onClose}
        >
            <Box onClick={(e) => e.stopPropagation()} maxW='90vw' maxH='90vh' overflow='auto'>
                {children}
            </Box>
        </Box>
    );
};
