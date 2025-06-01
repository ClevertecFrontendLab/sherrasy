import { Navigate, useParams } from 'react-router';

import { useGetCategoriesQuery } from '~/query/services/categories';
import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';
import { AppRoute } from '~/utils/constant';
import { getTabNames } from '~/utils/helpers/categories-helpers';

export const withCatSubValidation = (WrappedComponent: React.ComponentType) => () => {
    const { categoryId, subcategoryId } = useParams();
    const { data: dataCategories = [], isError } = useGetCategoriesQuery();
    const backupCategories = useAppSelector(getCategories);

    const categories = isError ? backupCategories : dataCategories;

    if (categories.length === 0) {
        return <Navigate to={AppRoute.NotFound} replace />;
    }

    const subcategories = getTabNames(categories, categoryId);
    const isValid = subcategories.some(({ category }) => category === subcategoryId);

    if (!isValid) {
        return <Navigate to={AppRoute.NotFound} replace />;
    }

    return <WrappedComponent />;
};
