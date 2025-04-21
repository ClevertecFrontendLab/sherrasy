import { breadcrumbAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    breadcrumbAnatomy.keys,
);
const breadcrumbStyle = definePartsStyle({
    list: {
        flexWrap: ['wrap', null, null, null, null, 'nowrap'],
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        color: 'blackAlpha.700',
        "&[aria-current='page']": {
            color: 'black',
        },
    },
    separator: {
        color: 'gray.800',
    },
});

export const breadCrumbTheme = defineMultiStyleConfig({
    baseStyle: breadcrumbStyle,
});
