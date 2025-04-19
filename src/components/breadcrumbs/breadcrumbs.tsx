import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { Link, useLocation, useParams } from 'react-router';

import data from '~/components/menu-dishes/mock-dishes.json';
import { MenuSubcategory } from '~/types/menu-item.type';
import { PathParams } from '~/types/params.type';
import { AppRoute, TagToName } from '~/utils/constant';
import { getTabNames } from '~/utils/helpers';

const renderSubcategoryBreadcrumb = (
    subcategoryId: string,
    tabsNames: MenuSubcategory[],
    categoryId: string,
    isLast: boolean,
) => {
    const currentItem = tabsNames.find(({ id }) => id === subcategoryId);
    const name = currentItem?.name || tabsNames[0]?.name || subcategoryId;

    return (
        <BreadcrumbItem key={name} isCurrentPage={isLast}>
            <BreadcrumbLink as={Link} to={`/${categoryId}/${subcategoryId}`}>
                <Text>{name}</Text>
            </BreadcrumbLink>
        </BreadcrumbItem>
    );
};

const renderRecipeBreadcrumb = (recipeName: string, recipeId: string, isLast: boolean) => (
    <BreadcrumbItem key={recipeId} isCurrentPage={isLast}>
        <BreadcrumbLink maxW={{ lg: '70%', xl: '90%' }}>
            <Text isTruncated>{recipeName}</Text>
        </BreadcrumbLink>
    </BreadcrumbItem>
);

const renderCategoryBreadcrumb = (
    segment: string,
    tabsNames: MenuSubcategory[],
    isLast: boolean,
) => (
    <BreadcrumbItem key={segment} isCurrentPage={isLast}>
        <BreadcrumbLink as={Link} to={`/${segment}/${tabsNames[0]?.id}`}>
            <Text w='max-content'>{TagToName[segment]}</Text>
        </BreadcrumbLink>
    </BreadcrumbItem>
);

function Breadcrumbs() {
    const location = useLocation();
    const { categoryId, subcategoryId, recipeId } = useParams<PathParams>();
    const { recipeName } = location.state || {};
    const pathnames = location.pathname.split('/').filter(Boolean);
    const isJuiciestPath = pathnames.includes('juiciest');
    const tabsNames = getTabNames(data);

    const breadcrumbItems = pathnames.map((segment, index) => {
        const isLast = index === pathnames.length - 1;

        if (segment === 'juiciest') return null;

        if (subcategoryId && segment === subcategoryId) {
            return renderSubcategoryBreadcrumb(subcategoryId, tabsNames, categoryId!, isLast);
        }

        if (recipeId && segment === recipeId) {
            return renderRecipeBreadcrumb(recipeName, recipeId, isLast);
        }

        return renderCategoryBreadcrumb(segment, tabsNames, isLast);
    });

    return (
        <Breadcrumb
            ml={32}
            spacing='2px'
            data-test-id='breadcrumbs'
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
}

export default Breadcrumbs;
