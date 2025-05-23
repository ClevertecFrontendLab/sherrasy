import { extendTheme } from '@chakra-ui/react';

import { badgeTheme } from './ui-theme/badge.theme';
import { breadCrumbTheme } from './ui-theme/breadcrumb.theme';
import { buttonTheme } from './ui-theme/button.theme';
import { cardTheme } from './ui-theme/card.theme';
import { checkboxTheme } from './ui-theme/checkbox.theme';
import { inputTheme } from './ui-theme/input.theme';
import { menuTheme } from './ui-theme/menu.theme';
import { modalTheme } from './ui-theme/modal.theme';
import { progressTheme } from './ui-theme/progress.theme';
import { tableTheme } from './ui-theme/table.theme';
import { tagTheme } from './ui-theme/tag.theme';

export const theme = extendTheme({
    colors: {
        black: {
            500: '#000000',
        },
        lime: {
            50: '#ffffd3',
            100: '#eaffc7',
            150: '#d7ff94',
            300: '#c4ff61',
            400: '#b1ff2e',
            500: '#b1ff2e',
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
        Badge: badgeTheme,
        Table: tableTheme,
        Breadcrumb: breadCrumbTheme,
        Button: buttonTheme,
        Menu: menuTheme,
        Tag: tagTheme,
        Checkbox: checkboxTheme,
        Modal: modalTheme,
        Progress: progressTheme,
        Input: inputTheme,
    },
    breakpoints: {
        base: '0em',
        xs: '22em',
        sm: '30em',
        md: '48em',
        lg: '90em',
        xl: '110em',
        '2xl': '120em',
    },
});
