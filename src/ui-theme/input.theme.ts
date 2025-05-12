import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys,
);

const baseFormInput = definePartsStyle({
    field: {
        border: '1px solid #d7ff94',
        borderRadius: '6px',
        padding: '0px 16px',
        background: '#fff',
        color: 'lime.800',
        _placeholder: {
            color: 'lime.800',
        },
        _invalid: {
            border: '2px solid #e53e3e',
        },
    },
});

export const inputTheme = defineMultiStyleConfig({
    variants: { baseFormInput },
});
