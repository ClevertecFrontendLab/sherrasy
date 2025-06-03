import { Heading } from '@chakra-ui/react';

import { CookBlogListSection } from '~/components/cook-blog-section/cook-blog-list-section';
import { Layout } from '~/components/layout/page-layout/layout';
import { NewSection } from '~/components/new-section/new-section';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { CardsLimit } from '~/utils/constant';
import { getCookBlogQueryString } from '~/utils/helpers/get-request-query';
import { getCurrentId } from '~/utils/helpers/helpers';

export const CookBlogPage = () => {
    const currentUserId = getCurrentId() ?? '';
    const query = getCookBlogQueryString(
        { limit: CardsLimit.CookBlogOthers, currentUserId },
        false,
    );
    const { data, isFetching } = useGetBloggersQuery(query);
    if (isFetching || !data) {
        return null;
    }
    return (
        <Layout>
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
            <CookBlogListSection type='others' data={data.others} />
            <NewSection />
        </Layout>
    );
};
