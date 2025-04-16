import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const defaultBadgeStyle = {
    h: '1.5rem',
    borderRadius: 2,
    fontSize: 'sm',
    fontWeight: 400,
    lineHeight: 5,
    textTransform: 'none',
};

const vCard = defineStyle({
    ...defaultBadgeStyle,
    bgColor: 'lime.150',
    alignItems: 'center',
});

const hCard = defineStyle({
    ...defaultBadgeStyle,
    display: 'flex',
    bgColor: 'lime.50',
    alignItems: 'center',
});

const time = defineStyle({
    ...defaultBadgeStyle,
    display: 'flex',
    bgColor: 'blackAlpha.100',
    alignItems: 'center',
});

const rkCard = defineStyle({
    ...defaultBadgeStyle,
    bgColor: 'lime.50',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

const author = defineStyle({
    ...defaultBadgeStyle,
    fontWeight: 600,
    bgColor: 'lime.150',
    p: 0,
});

export const badgeTheme = defineStyleConfig({
    variants: { vCard, hCard, author, rkCard, time },
});
