import { extendTheme } from '@chakra-ui/react';

import { cardTheme } from './ui-theme/card.theme';

export const theme = extendTheme({
    colors: {
        lime: {
            50: '#ffffd3',
            100: '#eaffc7',
            150: '#d7ff94',
            300: '#c4ff61',
            400: '#b1ff2e',
            600: '#2db100',
            700: '#207e00',
            800: '#134b00',
        },
    },
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
    },
    components: {
        Card: cardTheme,
    },
    breakpoints: {
        base: '0em', //0px
        xs: '22em', //352px
        sm: '30em', //480px
        md: '48em', //768px
        lg: '90em', //1440px
        xl: '100em', //1760px
        '2xl': '120em', //1920px
    },
});
