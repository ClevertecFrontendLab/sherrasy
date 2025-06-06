import { Box, Flex } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import authorAvatar from '~/assets/images/avatar/author-avatar.jpg';
import { AuthorCard } from '~/components/cards/user-cards/author-card';
import { OverlayWithLoader } from '~/components/layout/overlay/overlayWithLoader';
import { Layout } from '~/components/layout/page-layout/layout';
import { RecipeDetails } from '~/components/recipe-details/recipe-details';
import { RecipeHeader } from '~/components/recipe-header/recipe-header';
import { RecipeSteps } from '~/components/recipe-steps/recipe-steps';
import { NewSection } from '~/components/sections/new-section/new-section';
import { useGetRecipeByIdQuery } from '~/query/services/recipes';

const MockAuthor = {
    id: '16',
    avatar: authorAvatar,
    name: 'Сергей Разумов',
    nick: '@serge25',
    description: '',
    subscribers: 125,
};

export const RecipePage = () => {
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const {
        data: recipe,
        isFetching,
        error,
    } = useGetRecipeByIdQuery(isDeleting || !recipeId ? skipToken : recipeId);

    useEffect(() => {
        if (isFetching) return;
        if (error || !recipe) {
            navigate(-1);
        }
    }, [recipe, isFetching, error, navigate]);

    if (isFetching) {
        return <OverlayWithLoader isOpen={isFetching}></OverlayWithLoader>;
    }

    if (!recipe || error) {
        return null;
    }
    const { portions, nutritionValue, ingredients, steps } = recipe;
    return (
        <Layout>
            <Flex
                direction='column'
                justify='center'
                align='center'
                mt={{ base: 4, sm: '1.125rem', md: 4, lg: 14 }}
            >
                <RecipeHeader recipe={recipe} onDeleteStart={() => setIsDeleting(true)} />
                <RecipeDetails
                    portions={portions}
                    nutritionValue={nutritionValue}
                    ingredients={ingredients}
                />
                <RecipeSteps steps={steps} />
                <AuthorCard author={MockAuthor} />
            </Flex>
            <Box mt={{ base: 10, lg: '3.75rem' }}>
                <NewSection />
            </Box>
        </Layout>
    );
};
