import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation, useParams } from 'react-router';

import { getBloggerName } from '~/store/blogger/selectors';
import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';
import { getRecipeName } from '~/store/recipes/selectors';
import { PathParams } from '~/types/params.type';
import { AppRoute, AppRouteToName } from '~/utils/constant';
import { getTabNames } from '~/utils/helpers/categories-helpers';
import { TestIdName } from '~/utils/testId-name.enum';

import { renderCustomBreadcrumb } from './render-breadcrumbs';

export const Breadcrumbs = () => {
    const DEFAULT_SEGMENTS = ['the-juiciest', 'new-recipe', 'edit-recipe', 'blogs'];
    const location = useLocation();
    const { categoryId, subcategoryId, recipeId, userId } = useParams<PathParams>();
    const recipeName = useAppSelector(getRecipeName);
    const bloggerName = useAppSelector(getBloggerName);
    const pathnames = location.pathname.split('/').filter(Boolean);
    const isDefaultSegment = (segment: string) => DEFAULT_SEGMENTS.includes(segment);
    const isLastFromDefault = (segment: string) => pathnames[pathnames.length - 1] === segment;
    const data = useAppSelector(getCategories);
    if (!data || location.pathname === AppRoute.NotFound) {
        return null;
    }
    const tabsNames = getTabNames(data, categoryId);
    const category = data.find(({ category }) => category === categoryId);
    const categoryName = category?.title || '';

    const defaultBreadcrumbs = DEFAULT_SEGMENTS.filter((segment) =>
        pathnames.includes(segment),
    ).map((segment) => {
        const name = AppRouteToName[segment];
        const isLast = isLastFromDefault(segment);
        return renderCustomBreadcrumb(segment, name, isLast, { currentLink: `/${segment}` });
    });

    const breadcrumbItems = pathnames.map((segment, index) => {
        const isLast = index === pathnames.length - 1;

        if (isDefaultSegment(segment)) return null;

        if (subcategoryId && segment === subcategoryId) {
            return renderCustomBreadcrumb(subcategoryId, '', isLast, {
                categoryId,
                subcategories: tabsNames,
            });
        }

        if (recipeId && segment === recipeId) {
            return renderCustomBreadcrumb(recipeId, recipeName, isLast, {
                type: 'text',
            });
        }

        if (userId && segment === userId) {
            return renderCustomBreadcrumb(userId, bloggerName, isLast, {
                type: 'text',
            });
        }

        if (categoryId && segment === categoryId && !isLast) {
            const categoryData = data.find(({ category }) => category === segment);
            const firstSubcategoryId = categoryData?.subCategories[0]?.category;
            return renderCustomBreadcrumb(segment, categoryName, isLast, {
                categoryId: segment,
                currentLink: firstSubcategoryId ? `/${segment}/${firstSubcategoryId}` : undefined,
            });
        }

        return renderCustomBreadcrumb(segment, categoryName, isLast);
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
                    {AppRouteToName[AppRoute.Main]}
                </BreadcrumbLink>
            </BreadcrumbItem>
            {defaultBreadcrumbs}
            {breadcrumbItems}
        </Breadcrumb>
    );
};
