import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { Link, useLocation, useParams } from 'react-router';

import data from '~/components/menu-dishes/mock-dishes.json';
import { PathParams } from '~/types/params.type';
import { AppRouteToName } from '~/utils/constant';

function Breadcrumbs() {
    const location = useLocation();
    const { subcategoryId } = useParams<PathParams>();
    const pathnames = location.pathname.split('/').filter((x) => x);
    let currentPath = '/';
    const tabsNames = data.find(({ tag }) => tag === 'vegan')?.elements || [];

    const breadcrumbItems = pathnames.map((segment, index) => {
        currentPath += `${index === 0 ? '' : '/'}${segment}`;
        const isLast = index === pathnames.length - 1;

        if (subcategoryId && segment === subcategoryId) {
            const currentItem = tabsNames.find(({ id }) => id === subcategoryId);
            const name = currentItem ? currentItem.name : tabsNames[0]?.name || segment;

            return (
                <BreadcrumbItem key={name} isCurrentPage={isLast}>
                    <Text>{name}</Text>
                </BreadcrumbItem>
            );
        }

        return (
            <BreadcrumbItem key={segment} isCurrentPage={isLast}>
                <Text>{AppRouteToName[currentPath] || segment}</Text>
            </BreadcrumbItem>
        );
    });

    return (
        <Breadcrumb
            ml={32}
            spacing='2px'
            data-test-id='breadcrumbs'
            separator={<ChevronRightIcon color='gray.500' />}
        >
            {' '}
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/'>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbItems}
        </Breadcrumb>
    );
}
export default Breadcrumbs;
