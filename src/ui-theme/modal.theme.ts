import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const transparent = definePartsStyle({
    overlay: {
        bgColor: 'blackAlpha.600',
    },
    dialog: {
        bgColor: 'transparent',
        boxShadow: 'none',
    },
});

const baseStyle = definePartsStyle({
    overlay: {
        bgColor: 'blackAlpha.600',
    },
    header: {
        pt: 0,
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
    },
    dialog: { p: 6, w: ['316px', '316px', '316px', '316px', '396px'], borderRadius: '1rem' },
    closeButton: {
        width: '24px',
        height: '24px',
        border: '1px solid black',
        borderRadius: '50%',
        top: 6,
        right: 6,
    },
    body: { px: 0, display: 'flex', flexDir: 'column', alignItems: 'center' },
    footer: { w: '100%', mt: 4 },
});

export const modalTheme = defineMultiStyleConfig({ baseStyle, variants: { transparent } });
