import { Heading } from '@chakra-ui/react';
import { useState } from 'react';

import { OverlayWithLoader } from '~/components/layout/overlay/overlayWithLoader';
import { Layout } from '~/components/layout/page-layout/layout';
import { CookBlogListSection } from '~/components/sections/cook-blog-section/cook-blog-list-section';
import { NewSection } from '~/components/sections/new-section/new-section';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { CardsLimit } from '~/utils/constant';
import { getCookBlogQueryString } from '~/utils/helpers/get-request-query';
import { getCurrentId } from '~/utils/helpers/helpers';

export const CookBlogPage = () => {
    const currentUserId = getCurrentId() ?? '';
    const [limit, setLimit] = useState<string | number>(CardsLimit.CookBlogOthers);
    const query = getCookBlogQueryString({ limit, currentUserId });
    const { data, isFetching, error } = useGetBloggersQuery(query);

    const handleShowAll = () => {
        setLimit(CardsLimit.All);
    };

    if (!data || error) {
        return null;
    }
    return (
        <Layout>
            <OverlayWithLoader isOpen={isFetching} />
            <Heading
                mb={{
                    base: '13px',
                    xs: '1rem',
                    sm: '0.75rem',
                    md: '1rem',
                    lg: 8,
                    xl: 7,
                    '2xl': 8,
                }}
                mt={{ base: 3, xs: '1rem', lg: 8 }}
                fontSize={{ base: '2xl', lg: '5xl' }}
                lineHeight={{ base: 8, lg: 'none' }}
            >
                Кулинарные блоги
            </Heading>
            <CookBlogListSection type='favorite' data={data.favorites} />
            <CookBlogListSection
                type='others'
                data={data.others}
                handleShowAll={handleShowAll}
                btnHidden={limit === CardsLimit.All}
            />
            <NewSection />
        </Layout>
    );
};
