import { Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { OverlayWithLoader } from '~/components/layout/overlay/overlayWithLoader';
import { Layout } from '~/components/layout/page-layout/layout';
import { CookBlogListSection } from '~/components/sections/cook-blog-section/cook-blog-list-section';
import { NewSection } from '~/components/sections/new-section/new-section';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { AppRoute, CardsLimit } from '~/utils/constant';
import { getCurrentUserId } from '~/utils/helpers/blogger-author-helpers';
import { getCookBlogQueryString } from '~/utils/helpers/get-request-query';

export const CookBlogPage = () => {
    const currentUserId = getCurrentUserId() ?? '';
    const navigate = useNavigate();
    const [blogsPerView, setBlogsPerView] = useState<number | string>(CardsLimit.CookBlogOthers);
    const query = getCookBlogQueryString({ limit: blogsPerView, currentUserId });
    const { data, isFetching, isError } = useGetBloggersQuery(query);

    const handleChangeShowed = (value: string | number) => {
        setBlogsPerView(value);
    };
    useEffect(() => {
        if (isError) {
            navigate(AppRoute.Main);
        }
    }, [isError, navigate]);

    if (!data) {
        return null;
    }

    return (
        <Layout>
            <OverlayWithLoader isOpen={isFetching} />
            <Heading
                mt={{ base: 3, xs: '1rem', lg: 8 }}
                fontSize={{ base: '2xl', lg: '5xl' }}
                lineHeight={{ base: 8, lg: 'none' }}
            >
                Кулинарные блоги
            </Heading>
            <VStack gap={{ base: 8, lg: 10 }} w='100%'>
                <CookBlogListSection type='favorite' data={data?.favorites ?? []} />
                <CookBlogListSection
                    type='others'
                    data={data?.others ?? []}
                    handleChangeShowed={handleChangeShowed}
                />
            </VStack>
            <NewSection />
        </Layout>
    );
};
