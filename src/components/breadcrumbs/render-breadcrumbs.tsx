import { BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { Subcategory } from '~/types/category.type';

const textStyles = {
    link: {
        w: 'max-content',
    },
    text: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'inline-block',
        maxW: { base: '19rem', lg: '38rem', xl: '56.25rem' },
    },
};

const linkProps = {
    link: {
        as: Link,
        maxH: undefined,
    },
    text: {
        as: undefined,
        maxH: 6,
    },
};

export const renderCustomBreadcrumb = (
    id: string,
    name: string,
    isLast: boolean,
    options?: {
        type?: 'link' | 'text';
        categoryId?: string;
        subcategories?: Subcategory[];
        currentLink?: string;
        testId?: string;
    },
) => {
    const { type = 'link', categoryId, subcategories, currentLink, testId = '' } = options || {};

    const linkName = subcategories
        ? subcategories.find((subcategory) => subcategory.category === id)?.title ||
          subcategories[0]?.title ||
          id
        : name;
    const href = currentLink || (categoryId ? `/${categoryId}/${id}` : undefined);

    return (
        <BreadcrumbItem key={id} isCurrentPage={isLast} data-test-id={testId}>
            <BreadcrumbLink {...linkProps[type]} to={href}>
                <Text {...textStyles[type]}>{linkName}</Text>
            </BreadcrumbLink>
        </BreadcrumbItem>
    );
};
