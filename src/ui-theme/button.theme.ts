import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const solid = defineStyle((props) => {
    const { colorScheme: c } = props;

    return {
        _hover: {
            bg: `${c}.300`,
            color: `${c}.600`,
        },
        _disabled: {
            bg: 'blackAlpha.400',
            borderColor: 'blackAlpha.200',
            color: 'whiteAlpha.700',
        },
    };
});
const outlineMenu = defineStyle((_props) => ({
    borderColor: 'blackAlpha.600',
    borderRadius: '6px',
    bg: 'white',
    border: '1px',
    minH: '2.5rem',
    h: 'auto !important',
    _hover: { borderColor: 'lime.150' },
    _expanded: { borderColor: 'lime.150', bgColor: 'white' },
}));

export const buttonTheme = defineStyleConfig({
    variants: { solid, outlineMenu },
});
