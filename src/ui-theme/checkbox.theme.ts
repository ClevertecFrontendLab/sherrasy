import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    checkboxAnatomy.keys,
);

const baseStyle = definePartsStyle({
    icon: {
        color: 'black',
    },
    control: {
        borderColor: 'lime.150',
        _checked: {
            bg: 'lime.400',
            borderColor: 'lime.400',
        },
    },
    label: {
        fontSize: 'sm',
        lineHeight: 5,
    },
});

export const checkboxTheme = defineMultiStyleConfig({ baseStyle });
