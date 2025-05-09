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

export const modalTheme = defineMultiStyleConfig({
    variants: { transparent },
});
