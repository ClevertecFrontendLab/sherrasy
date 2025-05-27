import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation, useParams } from 'react-router';

import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';
import { getRecipeName } from '~/store/recipes/selectors';
import { PathParams } from '~/types/params.type';
import { AppRoute, AppRouteToName } from '~/utils/constant';
import { getTabNames } from '~/utils/helpers/categories-helpers';
import { TestIdName } from '~/utils/testId-name.enum';

import { renderCustomBreadcrumb } from './render-breadcrumbs';

export const Breadcrumbs = () => {
    const DEFAULT_SEGMENTS = ['the-juiciest', 'new-recipe', 'edit-recipe'];
    const location = useLocation();
    const { categoryId, subcategoryId, recipeId } = useParams<PathParams>();
    const recipeName = useAppSelector(getRecipeName);
    const pathnames = location.pathname.split('/').filter(Boolean);
    const isJuiciestPath = pathnames.includes(DEFAULT_SEGMENTS[0]);
    const isNewRecipePath = pathnames.includes(DEFAULT_SEGMENTS[1]);
    const isLastFromDefault = (segment: string) => pathnames[pathnames.length - 1] === segment;
    const data = useAppSelector(getCategories);
    if (!data || location.pathname === AppRoute.NotFound) {
        return null;
    }
    const tabsNames = getTabNames(data, categoryId);
    const categoryName = data.find(({ category }) => category === categoryId)?.title || '';

    const breadcrumbItems = pathnames.map((segment, index) => {
        const isLast = index === pathnames.length - 1;

        if (DEFAULT_SEGMENTS.includes(segment)) return null;

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
            {isJuiciestPath && (
                <BreadcrumbItem isCurrentPage={isLastFromDefault(DEFAULT_SEGMENTS[0])}>
                    <BreadcrumbLink as={Link} to={AppRoute.Juiciest}>
                        {AppRouteToName[AppRoute.Juiciest]}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {isNewRecipePath && (
                <BreadcrumbItem isCurrentPage={isLastFromDefault(DEFAULT_SEGMENTS[1])}>
                    <BreadcrumbLink as={Link} to={AppRoute.NewRecipe}>
                        {AppRouteToName[AppRoute.NewRecipe]}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {breadcrumbItems}
        </Breadcrumb>
    );
};
