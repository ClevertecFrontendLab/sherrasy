import { Button, ButtonGroup, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { BookmarkIcon, EditIcon, HeartEyesIcon, RemoveIcon } from '~/assets/icons/icons';

export const RecipeControls = ({ isAuthor, recipeId }: { isAuthor: boolean; recipeId: string }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const handleLikeClick = () => console.log('like', recipeId);
    const handleBookmarkClick = () => console.log('bookmark', recipeId);
    const handleDeleteClick = () => console.log('delete', recipeId);
    const handleNavigateClick = () => navigate(`/edit-recipe${pathname}`);
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
