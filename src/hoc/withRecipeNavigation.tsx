import { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { FullRecipe } from '~/types/recipe.interface';
import { AppRoute } from '~/utils/constant';

type withRecipeNavigationProps = {
    recipe: FullRecipe;
    onClick?: () => void;
};

export const withRecipeNavigation =
    <P extends withRecipeNavigationProps>(WrappedComponent: (props: P) => ReactElement) =>
    (props: Omit<P, 'onClick'>) => {
        const navigate = useNavigate();
        const { pathname } = useLocation();
        const { recipe } = props;
        const handleClick = () => {
            const basePath = pathname.includes(AppRoute.Juiciest) ? `${AppRoute.Juiciest}` : '';
            navigate(`${basePath}/${recipe.category[0]}/${recipe.subcategory[0]}/${recipe.id}`, {
                state: {
                    recipeName: props.recipe.title,
                },
            });
        };

        return <WrappedComponent {...(props as P)} onClick={handleClick} />;
    };
