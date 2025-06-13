import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { OverlayWithLoader } from '~/components/layout/overlay/overlayWithLoader';
import { Layout } from '~/components/layout/page-layout/layout';
import { NotesSection } from '~/components/notes-section/notes-section';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { CookBlogUserOtherSection } from '~/components/sections/cook-blog-section/cook-blog-other-section';
import { UserBlockBlogger } from '~/components/user-block/user-block-blogger';
import { useBloggerErrorRedirect } from '~/hooks/useBloggerErrorRedirect';
import { useGetBloggerByIdQuery, useGetBloggersQuery } from '~/query/services/bloggers';
import { useGetRecipesByUserQuery } from '~/query/services/recipes';
import { setBloggerName } from '~/store/blogger/blogger-slice';
import { useAppDispatch } from '~/store/hooks';
import { CardsLimit } from '~/utils/constant';
import { getBloggerCardName, getCurrentUserId } from '~/utils/helpers/blogger-author-helpers';
import { getCookBlogQueryString } from '~/utils/helpers/get-request-query';
import { TestIdName } from '~/utils/testId-name.enum';

export const BloggerPage = () => {
    const { userId = '' } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUserId = getCurrentUserId() ?? '';
    const bloggerQuery = getCookBlogQueryString({ currentUserId });
    const listQuery = getCookBlogQueryString({ currentUserId, limit: '' });
    const [limit, setLimit] = useState<string | number>(CardsLimit.Default);

    const handleShowAll = () => {
        setLimit(CardsLimit.All);
    };
    const showAll = limit === CardsLimit.All;
    const {
        data: blogger,
        isFetching: isFetchingBlogger,
        error: errorBlogger,
        isError: isBloggerError,
    } = useGetBloggerByIdQuery(`${userId}?${bloggerQuery}`);
    const {
        data: recipesData,
        isError: isRecipesError,
        error: errorRecipes,
    } = useGetRecipesByUserQuery(userId);
    const { data: bloggersData, isError: isBloggersError } = useGetBloggersQuery(listQuery);

    const { handleErrors } = useBloggerErrorRedirect();
    const errors = { errorBlogger, isBloggerError, isRecipesError, errorRecipes, isBloggersError };
    useEffect(() => {
        handleErrors(errors);
    }, [errors, handleErrors]);

    useEffect(() => {
        if (!blogger) return;
        const name = getBloggerCardName(
            blogger?.bloggerInfo.firstName ?? '',
            blogger?.bloggerInfo.lastName ?? '',
        );
        dispatch(setBloggerName(`${name} (@${blogger?.bloggerInfo.login})`));
    }, [blogger, isFetchingBlogger, errorBlogger, navigate]);

    if (isFetchingBlogger) {
        return <OverlayWithLoader isOpen={isFetchingBlogger} />;
    }

    if (!blogger) {
        return null;
    }

    const bloggerRecipies = showAll ? recipesData?.recipes : recipesData?.recipes?.slice(0, 8);
    return (
        <Layout>
            <Flex direction='column' justify='center' align='center' mt={{ base: 4, lg: 6, xl: 8 }}>
                <UserBlockBlogger blogger={blogger} />
                <Flex
                    direction='column'
                    gap={{ base: 3, sm: 3.5 }}
                    justify='center'
                    mt={{ base: 4, lg: 6, xl: 8 }}
                >
                    <RecipesList
                        recipes={bloggerRecipies ?? []}
                        testId={TestIdName.RecipeCardList}
                    />
                    {!showAll && (
                        <Button
                            bg='lime.400'
                            mt={1}
                            size='md'
                            alignSelf='center'
                            onClick={handleShowAll}
                            data-test-id={TestIdName.LoadMoreBtn}
                        >
                            <Text fontWeight={600} fontSize='md' lineHeight={6}>
                                Загрузить еще
                            </Text>
                        </Button>
                    )}
                </Flex>
            </Flex>
            <Box mt={{ base: 10, lg: '3.75rem' }}>
                <NotesSection notes={recipesData?.notes ?? []} />
                <CookBlogUserOtherSection bloggers={bloggersData?.others ?? []} />
            </Box>
        </Layout>
    );
};
