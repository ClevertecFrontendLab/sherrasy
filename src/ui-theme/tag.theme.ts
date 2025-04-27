import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys);

const baseStyle = definePartsStyle({
    container: {
        border: '1px',
        borderColor: 'lime.400',
        color: 'lime.600',
        maxW: '15.5rem',
        bg: 'transparent',
    },
    label: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxW: '12.5rem',
        fontSize: 'xs',
        lineHeight: 4,
    },
    closeButton: {
        pointerEvents: 'auto',
        boxSize: 4,
        color: 'lime.600',
    },
});

const drawerStyle = definePartsStyle({
    container: {
        border: '1px',
        borderColor: 'lime.400',
        color: 'lime.700',
        maxW: '15.5rem',
        bg: 'lime.100',
    },
    label: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxW: '12.5rem',
        text: 'sm',
        lineHeight: 5,
    },
    closeButton: {
        pointerEvents: 'auto',
        boxSize: 4,
        color: 'lime.700',
    },
});

export const tagTheme = defineMultiStyleConfig({ baseStyle, variants: { drawerStyle } });
