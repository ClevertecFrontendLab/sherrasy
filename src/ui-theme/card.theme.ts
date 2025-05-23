import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    cardAnatomy.keys,
);

const outlineStyles = {
    border: '1px',
    borderColor: 'gray.200 !important',
};

const vCard = definePartsStyle({
    container: {
        ...outlineStyles,
        minW: ['9.3125rem', '9.875rem', '9.75rem', '9.875rem', '17.4375rem', null, '20.125rem'],
        maxW: ['9.3125rem', '9.875rem', '9.75rem', '9.875rem', '17.4375rem', null, '20.125rem'],
        minH: ['13rem', '13.5rem', '13.75rem', '13.75rem', '25.125rem', null, '25.875rem'],
    },
    body: {
        p: 0,
    },
    footer: {
        px: [1.5, 2, null, null, 3, null, '1.375rem'],
        py: [0, 0, 0, 0, 1.5, null, 3],
    },
});

const hCard = definePartsStyle({
    container: {
        ...outlineStyles,
        minH: ['7.75rem', '8rem', null, '8.0625rem', '15.25rem'],
        minW: ['19.375rem', '20.5rem', '21.75rem', '22.25rem', '54.375rem', null, '40.625rem'],
        maxW: ['19.375rem', '20.5rem', '21.75rem', '22.25rem', '54.375rem', null, '40.625rem'],
    },
    body: {
        py: [2, null, null, null, 1],
        px: 0,
        minW: '10.1875rem',
    },
    footer: {
        justifyContent: 'flex-end',
        gap: [2, 3, 7, 3, 2],
        py: 0,
        px: [3, '0.625rem', 2, null, 3, null, 0],
        pr: [4, '0.625rem'],
        pb: [null, null, null, null, 1, null, 0.5],
    },
});

const nutrition = definePartsStyle({
    container: {
        ...outlineStyles,
        textAlign: 'start',
        px: 3,
        py: 4,
        borderRadius: '0.875rem',
        w: ['20.5rem', null, '10.8125rem', null, '8.4375rem', '9.3125rem'],
    },
    body: {
        p: 0,
        display: 'flex',
        flexDirection: ['row', null, 'column'],
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: [null, null, 'center'],
        gap: [null, null, 3],
    },
});

const recipeStep = definePartsStyle({
    container: {
        ...outlineStyles,
        overflow: 'hidden',
        minW: ['19.375rem', '20.5rem', '37.25rem', '37.75rem', '36.125rem', null, '41.75rem'],
        maxW: ['19.375rem', '20.5rem', '37.25rem', '37.75rem', '36.125rem', null, '41.75rem'],
        maxH: ['7.75rem', '8rem', null, '8.0625rem', '15.25rem'],
    },
    body: {
        p: [2, null, null, null, '1.375rem', '1.25rem 1.5rem'],
    },
});

const rkMedium = definePartsStyle({
    container: {
        ...outlineStyles,
        minW: ['19.375rem', '20.5rem', '14.25rem', '14.5rem'],
        maxW: ['19.375rem', '20.5rem', '14.25rem', '14.5rem', '17.625rem', null, '20.125rem'],
        minH: ['10rem', '10.5rem', '10.25rem', '10.5rem', '11.25rem', null, '12rem'],
        maxH: ['10rem', '10.5rem', '10.25rem', '10.5rem', '11.25rem', null, '12rem'],
        p: [2.5, 3, null, null, 3.5, null, '1.375rem'],
        pb: [null, null, null, null, '1rem', null, '1.375rem'],
    },
    header: { p: 0, pb: 2 },
    body: { p: 0 },
    footer: { p: 0, pb: [null, null, null, 0.5], justify: 'space-between', maxH: '1.5rem' },
});

const rkShort = definePartsStyle({
    container: {
        ...outlineStyles,
        h: '100%',
        minH: ['3rem', '3.25rem', null, '3.125rem', '3.25rem', null, '3.5rem'],
        maxH: ['3rem', '3.25rem', null, '3.125rem', '3.25rem', null, '3.5rem'],
        minW: [null, null, null, null, null, null, '41.75rem'],
        maxW: ['19.375rem', '20.5rem', '14.5rem', '14.875rem', '17.6875rem', null, '41.75rem'],
        p: [2.5, 3, null, null, null, null, 3],
        pr: [null, null, null, null, 0.5],
    },
    body: {
        p: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxH: '2rem',
        gap: [2, 1, null, null, 0],
        pb: [2, 1.5],
    },
});

const cardStyle = definePartsStyle({
    container: {
        _hover: {
            boxShadow:
                '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
        },
    },
});

export const cardTheme = defineMultiStyleConfig({
    baseStyle: cardStyle,
    variants: { vCard, hCard, nutrition, recipeStep, rkMedium, rkShort },
});
