import { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useGetCategoriesQuery } from '~/query/services/categories';
import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { getCategories } from '~/store/categories/selectors';
import { useAppSelector } from '~/store/hooks';
import { FullRecipe } from '~/types/recipe.interface';
import { AppRoute } from '~/utils/constant';
import { getCatSubPairs } from '~/utils/helpers';

type withRecipeNavigationProps = {
    recipe: FullRecipe;
    onClick?: () => void;
};

export const withRecipeNavigation =
    <P extends withRecipeNavigationProps>(WrappedComponent: (props: P) => ReactElement) =>
    (props: Omit<P, 'onClick'>) => {
        const navigate = useNavigate();
        const { pathname } = useLocation();
        const {
            recipe: { _id, title, categoriesIds },
        } = props;
        const { data: dataCategories = [], isError: hasCatError } = useGetCategoriesQuery();
        const backupCategories = useAppSelector(getCategories);
        const categories = hasCatError ? backupCategories : dataCategories;
        const { isError, isLoading } = useGetRecipeByIdQuery(_id);
        const pathSegments = getCatSubPairs(categories, categoriesIds)[0];
        const handleClick = () => {
            const basePath = pathname.includes(AppRoute.Juiciest) ? `${AppRoute.Juiciest}` : '';
            if (!isLoading && !isError) {
                navigate(
                    `${basePath}/${pathSegments.category.category}/${pathSegments.subcategory.category}/${_id}`,
                    {
                        state: {
                            recipeName: title,
                        },
                    },
                );
            }
        };

        return <WrappedComponent {...(props as P)} onClick={handleClick} />;
    };
