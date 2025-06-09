import { Heading, useMediaQuery, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { OverlayWithLoader } from '~/components/layout/overlay/overlayWithLoader';
import { Layout } from '~/components/layout/page-layout/layout';
import { CookBlogListSection } from '~/components/sections/cook-blog-section/cook-blog-list-section';
import { NewSection } from '~/components/sections/new-section/new-section';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { CardsLimit } from '~/utils/constant';
import { getCurrentUserId } from '~/utils/helpers/blogger-author-helpers';
import { getCookBlogQueryString } from '~/utils/helpers/get-request-query';

export const CookBlogPage = () => {
    const currentUserId = getCurrentUserId() ?? '';
    const [isAllVisible, setIsAllVisible] = useState(false);
    const limit = isAllVisible ? CardsLimit.CookBlogOthers : CardsLimit.All;
    const query = getCookBlogQueryString({ limit, currentUserId });
    const { data, isFetching, error } = useGetBloggersQuery(query);
    const [isDesktop] = useMediaQuery('(min-width: 1920px)');
    const handleShowAll = () => {
        setIsAllVisible((prev) => !prev);
    };

    if (!data || error) {
        return null;
    }
    const otherList =
        !isDesktop && !isAllVisible ? data.others.slice(0, CardsLimit.Default) : data.others;
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
            <VStack gap={{ base: 8, lg: 10 }}>
                <CookBlogListSection type='favorite' data={data.favorites} />
                <CookBlogListSection
                    type='others'
                    data={otherList}
                    handleShowAll={handleShowAll}
                    isAllVisible={isAllVisible}
                />
            </VStack>
            <NewSection />
        </Layout>
    );
};
