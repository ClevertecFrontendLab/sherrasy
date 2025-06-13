import { ReactElement } from 'react';
import { useNavigate } from 'react-router';

import { useGetCategoriesQuery } from '~/query/services/categories';
import { getCategories } from '~/store/categories/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setRecipeName } from '~/store/recipes/recipes-slice';
import { FullRecipe } from '~/types/recipe.interface';
import { getCatSubPairs } from '~/utils/helpers/categories-helpers';

type withRecipeNavigationProps = {
    recipe: FullRecipe;
    onClick?: () => void;
};

export const withRecipeNavigation =
    <P extends withRecipeNavigationProps>(WrappedComponent: (props: P) => ReactElement) =>
    (props: Omit<P, 'onClick'>) => {
        const navigate = useNavigate();
        const dispatch = useAppDispatch();
        const {
            recipe: { _id, title, categoriesIds },
        } = props;
        const { data: dataCategories = [], isError: hasCatError } = useGetCategoriesQuery();
        const backupCategories = useAppSelector(getCategories);
        const categories = hasCatError ? backupCategories : dataCategories;
        const pathSegments = getCatSubPairs(categories, categoriesIds)[0];

        const handleClick = async () => {
            dispatch(setRecipeName(title));
            navigate(
                `/${pathSegments.category.category}/${pathSegments.subcategory.category}/${_id}`,
            );
        };
        return <WrappedComponent {...(props as P)} onClick={handleClick} />;
    };
