import { Button, ButtonGroup, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { BookmarkIcon, EditIcon, HeartEyesIcon, RemoveIcon } from '~/assets/icons/icons';
import {
    useBookmarkRecipeMutation,
    useDeleteRecipeMutation,
    useLikeRecipeMutation,
} from '~/query/services/recipes';
import { AppRoute } from '~/utils/constant';
import { TestIdName } from '~/utils/testId-name.enum';

export const RecipeControls = ({ isAuthor, recipeId }: { isAuthor: boolean; recipeId: string }) => {
    const { pathname } = useLocation();
    const [likeRecipe] = useLikeRecipeMutation();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();
    const [deleteRecipe, { isSuccess: isDeleted }] = useDeleteRecipeMutation();
    const navigate = useNavigate();
    const handleLikeClick = async () => await likeRecipe(recipeId);
    const handleBookmarkClick = async () => await bookmarkRecipe(recipeId);
    const handleDeleteClick = async () => await deleteRecipe(recipeId);
    const handleNavigateClick = () => navigate(`/edit-recipe${pathname}`);
    useEffect(() => {
        if (isDeleted) {
            navigate(AppRoute.Main);
        }
    }, [isDeleted, navigate]);
    return (
        <ButtonGroup gap={0.5}>
            {isAuthor ? (
                <>
                    <Button
                        variant='chost'
                        colorScheme='black'
                        size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                        px={{ lg: 3 }}
                        onClick={handleDeleteClick}
                        data-test-id={TestIdName.RecipeDeleteButton}
                    >
                        <RemoveIcon />
                    </Button>
                    <Button
                        variant='outline'
                        colorScheme='black'
                        size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                        leftIcon={<EditIcon />}
                        px={{ lg: 2 }}
                        onClick={handleNavigateClick}
                    >
                        <Text>Редактировать рецепт</Text>
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        variant='outline'
                        colorScheme='black'
                        size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                        onClick={handleLikeClick}
                    >
                        <HeartEyesIcon color='black' />
                        <Text ml={2}>Оценить рецепт</Text>
                    </Button>
                    <Button
                        variant='solid'
                        bg='lime.400'
                        size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                        onClick={handleBookmarkClick}
                    >
                        <BookmarkIcon color='black' />
                        <Text ml={2}>Сохранить в закладки</Text>
                    </Button>
                </>
            )}
        </ButtonGroup>
    );
};
