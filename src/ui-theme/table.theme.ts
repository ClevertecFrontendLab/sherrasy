import { tableAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tableAnatomy.keys,
);

const customTable = definePartsStyle((props) => {
    const { colorScheme: c } = props;

    return {
        th: {
            paddingY: '10px',
            '&:first-of-type': {
                paddingX: '0.5rem',
            },
            '&:last-of-type': {
                paddingX: 0,
            },
        },
        td: {
            paddingX: '0.5rem',
            paddingY: '0.625rem',
        },
        tr: {
            'td:first-child': {
                textAlign: 'start',
            },
            'td:last-child': {
                textAlign: 'end',
            },
        },
        tbody: {
            tr: {
                '&:nth-of-type(odd)': {
                    td: {
                        background: `${c}.100`,
                    },
                },
                '&:nth-of-type(even)': {
                    td: {
                        background: `${c}.0`,
                    },
                },
            },
        },
    };
});

export const tableTheme = defineMultiStyleConfig({
    variants: { customTable },
});
