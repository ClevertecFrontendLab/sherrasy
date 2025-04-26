import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    menuAnatomy.keys,
);

const customMenu = definePartsStyle((props) => {
    const { colorScheme: c } = props;

    return {
        list: {
            borderRadius: '6px',
        },
        item: {
            color: 'gray.800',
            _hover: {
                bg: 'lime.50',
            },
            '&:nth-of-type(odd)': {
                bg: `${c}.100`,
                _hover: {
                    bg: 'lime.50',
                },
            },
            '&:nth-of-type(even)': {
                bg: `${c}.0`,
            },
            '& > .chakra-menu__icon-wrapper': {
                border: '2px',
                borderColor: 'lime.150',
                borderRadius: '2px',
                opacity: 1,
                '> svg': {
                    opacity: 0,
                },
            },
            '&[aria-checked=true]> .chakra-menu__icon-wrapper': {
                bg: 'lime.150',
                '> svg': {
                    opacity: 1,
                },
            },
        },
    };
});

export const menuTheme = defineMultiStyleConfig({
    variants: { customMenu },
});
