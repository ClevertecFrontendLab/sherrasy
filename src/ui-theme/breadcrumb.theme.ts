import { breadcrumbAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    breadcrumbAnatomy.keys,
);
const breadcrumbStyle = definePartsStyle({
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
