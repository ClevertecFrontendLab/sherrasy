import { progressAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    progressAnatomy.keys,
);

const baseStyle = definePartsStyle({
    track: {
        bgColor: 'blackAlpha.100',
    },
});

export const progressTheme = defineMultiStyleConfig({ baseStyle });
