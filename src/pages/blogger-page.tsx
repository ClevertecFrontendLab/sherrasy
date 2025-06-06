import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { OverlayWithLoader } from '~/components/layout/overlay/overlayWithLoader';
import { Layout } from '~/components/layout/page-layout/layout';
import { RecipesList } from '~/components/recipes-list/recipes-list';
import { UserBlockBlogger } from '~/components/user-block/user-block-blogger';
import { useGetBloggerByIdQuery } from '~/query/services/bloggers';
import { useGetRecipesByUserQuery } from '~/query/services/recipes';
import { AppRoute, CardsLimit } from '~/utils/constant';
import { getCookBlogQueryString } from '~/utils/helpers/get-request-query';
import { getCurrentId } from '~/utils/helpers/helpers';

export const BloggerPage = () => {
    const { userId = '' } = useParams();
    const navigate = useNavigate();
    const currentUserId = getCurrentId() ?? '';
    const query = getCookBlogQueryString({ currentUserId });
    const [limit, setLimit] = useState<string | number>(CardsLimit.Default);

    const handleShowAll = () => {
        setLimit(CardsLimit.All);
    };
    const showAll = limit === CardsLimit.All;
    const {
        data: blogger,
        isFetching: isFetchingBlogger,
        error: errorBlogger,
    } = useGetBloggerByIdQuery(`${userId}?${query}`);
    const { data: recipesData } = useGetRecipesByUserQuery(userId);
    useEffect(() => {
        if (isFetchingBlogger) return;
        if (errorBlogger || !blogger) {
            navigate(AppRoute.Main);
        }
    }, [blogger, isFetchingBlogger, errorBlogger, navigate]);

    if (isFetchingBlogger) {
        return <OverlayWithLoader isOpen={isFetchingBlogger}></OverlayWithLoader>;
    }

    if (!blogger || errorBlogger) {
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
                    <RecipesList recipes={bloggerRecipies ?? []} />
                    {!showAll && (
                        <Button
                            bg='lime.400'
                            mt={1}
                            size='md'
                            alignSelf='center'
                            onClick={handleShowAll}
                        >
                            <Text fontWeight={600} fontSize='md' lineHeight={6}>
                                Загрузить еще
                            </Text>
                        </Button>
                    )}
                </Flex>
            </Flex>
            <Box mt={{ base: 10, lg: '3.75rem' }}></Box>
        </Layout>
    );
};
