import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Layout } from '~/components/layout/page-layout/layout';
import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { checkRecipeAuthor } from '~/utils/helpers/helpers';

export const EditRecipePage = () => {
    const { categoryId, subcategoryId, recipeId } = useParams();
    const navigate = useNavigate();
    const { data: recipe, isFetching } = useGetRecipeByIdQuery(recipeId ?? skipToken);
    useEffect(() => {
        if (isFetching) return;
        if (!recipe) {
            navigate(-1);
            return;
        }
        const isAuthor = checkRecipeAuthor(recipe.authorId);
        if (!isAuthor) {
            navigate(`/${categoryId}/${subcategoryId}/${recipeId}`, {
                replace: true,
                state: {
                    recipeName: recipe.title,
                },
            });
        }
    }, [recipe, categoryId, subcategoryId, recipeId, isFetching]);

    return (
        <>
            <Layout>Форма</Layout>
        </>
    );
};
