import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { RecipeForm } from '~/components/forms/recipe-form';
import { Layout } from '~/components/layout/page-layout/layout';
import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { useAppDispatch } from '~/store/hooks';
import { setRecipeName } from '~/store/recipes/recipes-slice';
import { checkRecipeAuthor } from '~/utils/helpers/helpers';

export const EditRecipePage = () => {
    const { categoryId, subcategoryId, recipeId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data: recipe, isFetching } = useGetRecipeByIdQuery(recipeId ?? skipToken);
    useEffect(() => {
        if (isFetching) return;
        if (!recipe) {
            navigate(-1);
            return;
        }
        const isAuthor = checkRecipeAuthor(recipe.authorId);
        if (!isAuthor) {
            dispatch(setRecipeName(recipe.title));

            navigate(`/${categoryId}/${subcategoryId}/${recipeId}`, {
                replace: true,
            });
        }
    }, [recipe, categoryId, subcategoryId, recipeId, isFetching, dispatch, navigate]);

    return (
        <>
            <Layout>
                <RecipeForm recipe={recipe} />
            </Layout>
        </>
    );
};
