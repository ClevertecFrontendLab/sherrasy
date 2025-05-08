import { useToast } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { showAlertToast } from '~/components/alert-error/show-alert';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useLazyGetRecipeByIdQuery } from '~/query/services/recipes';
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
        const [triggerRecipe] = useLazyGetRecipeByIdQuery();
        const pathSegments = getCatSubPairs(categories, categoriesIds)[0];
        const toast = useToast();

        const handleClick = async () => {
            const basePath = pathname.includes(AppRoute.Juiciest) ? `${AppRoute.Juiciest}` : '';
            const result = await triggerRecipe(_id);

            if (result.error) {
                showAlertToast('load', toast);
                return;
            }

            if (result.data) {
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
