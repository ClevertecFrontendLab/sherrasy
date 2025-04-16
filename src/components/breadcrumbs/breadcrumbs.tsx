import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { Link, useLocation, useSearchParams } from 'react-router';

import { AppRouteToName } from '~/utils/constant';

function Breadcrumbs() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const subcategoryParam = searchParams.get('subcategory');
    const pathnames = location.pathname.split('/').filter((x) => x);
    let currentPath = '/';

    const breadcrumbItems = pathnames.map((name, index) => {
        currentPath += `${index === 0 ? '' : '/'}${name}`;
        const isLast = index === pathnames.length - 1;

        return (
            <BreadcrumbItem key={name} isCurrentPage={isLast}>
                <Text>{AppRouteToName[currentPath] || name}</Text>
            </BreadcrumbItem>
        );
    });

    if (subcategoryParam) {
        breadcrumbItems.push(
            <BreadcrumbItem key={subcategoryParam} isCurrentPage={true}>
                <Text>{subcategoryParam}</Text>
            </BreadcrumbItem>,
        );
    }

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
