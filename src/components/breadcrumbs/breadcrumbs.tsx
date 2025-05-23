import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { Link, useLocation, useParams } from 'react-router';

import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';
import { Subcategory } from '~/types/category.type';
import { PathParams } from '~/types/params.type';
import { AppRoute } from '~/utils/constant';
import { getTabNames } from '~/utils/helpers';
import { TestIdName } from '~/utils/testId-name.enum';

const renderSubcategoryBreadcrumb = (
    subcategoryId: string,
    tabsNames: Subcategory[],
    categoryId: string,
    isLast: boolean,
) => {
    const currentItem = tabsNames.find(({ category: id }) => id === subcategoryId);
    const name = currentItem?.title || tabsNames[0]?.title || subcategoryId;

    return (
        <BreadcrumbItem key={name} isCurrentPage={isLast}>
            <BreadcrumbLink as={Link} to={`/${categoryId}/${subcategoryId}`}>
                <Text w='max-content'>{name}</Text>
            </BreadcrumbLink>
        </BreadcrumbItem>
    );
};

const renderRecipeBreadcrumb = (recipeName: string, recipeId: string, isLast: boolean) => (
    <BreadcrumbItem key={recipeId} isCurrentPage={isLast}>
        <BreadcrumbLink maxH={6}>
            <Text
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
                display='inline-block'
                maxW={{ base: '19rem', lg: '38rem', xl: '56.25rem' }}
            >
                {recipeName}
            </Text>
        </BreadcrumbLink>
    </BreadcrumbItem>
);

const renderCategoryBreadcrumb = (
    segment: string,
    categoryName: string,
    tabsNames: Subcategory[],
    isLast: boolean,
) => (
    <BreadcrumbItem key={segment} isCurrentPage={isLast}>
        <BreadcrumbLink as={Link} to={`/${segment}/${tabsNames[0]?.category}`}>
            <Text w='max-content'>{categoryName}</Text>
        </BreadcrumbLink>
    </BreadcrumbItem>
);

export const Breadcrumbs = () => {
    const location = useLocation();
    const { categoryId, subcategoryId, recipeId } = useParams<PathParams>();
    const { recipeName } = location.state || {};
    const pathnames = location.pathname.split('/').filter(Boolean);
    const isJuiciestPath = pathnames.includes('the-juiciest');
    const data = useAppSelector(getCategories);
    if (!data || location.pathname === AppRoute.NotFound) {
        return null;
    }
    const tabsNames = getTabNames(data, categoryId);
    const categoryName = data.find(({ category }) => category === categoryId)?.title || '';

    const breadcrumbItems = pathnames.map((segment, index) => {
        const isLast = index === pathnames.length - 1;

        if (segment === 'the-juiciest') return null;

        if (subcategoryId && segment === subcategoryId) {
            return renderSubcategoryBreadcrumb(subcategoryId, tabsNames, categoryId!, isLast);
        }

        if (recipeId && segment === recipeId) {
            return renderRecipeBreadcrumb(recipeName, recipeId, isLast);
        }

        return renderCategoryBreadcrumb(segment, categoryName, tabsNames, isLast);
    });

    return (
        <Breadcrumb
            ml={{ lg: 32 }}
            spacing='2px'
            data-test-id={TestIdName.Breadcrumbs}
            separator={<ChevronRightIcon />}
        >
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to={AppRoute.Main}>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {isJuiciestPath && (
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={AppRoute.Juiciest}>
                        Самое сочное
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {breadcrumbItems}
        </Breadcrumb>
    );
};
