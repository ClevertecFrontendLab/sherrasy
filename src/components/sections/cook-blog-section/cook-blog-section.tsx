import { SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useGetBloggersQuery } from '~/query/services/bloggers';
import { Blogger } from '~/types/blogger.type';
import { AppRoute } from '~/utils/constant';
import { getCurrentUserId } from '~/utils/helpers/blogger-author-helpers';
import { getCookBlogQueryString } from '~/utils/helpers/get-request-query';
import { TestIdName } from '~/utils/testId-name.enum';

import { CookBlogCard } from '../../cards/user-cards/cook-blog-card/cook-blog-card';
import { SectionLayout } from '../../layout/section-layout/section-layout';

export const CookBlogSection = () => {
    const currentUserId = getCurrentUserId() ?? '';
    const query = getCookBlogQueryString({ limit: '', currentUserId });
    const { data, isFetching, isError } = useGetBloggersQuery(query);
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');

    const navigate = useNavigate();
    const handleAllClick = async () => {
        navigate(AppRoute.CookBlog);
    };
    if (isError || isFetching || !data) {
        return null;
    }
    const cookBlog = data?.others?.slice(0, 3);
    return (
        <SectionLayout
            type='cook-blog'
            title='Кулинарные блоги'
            onBtnClick={handleAllClick}
            isVibrant
            btnHidden={isDesktop}
        >
            <SimpleGrid
                maxW='100%'
                gap={{ base: 3, lg: 4 }}
                px={{ base: 3, md: 6 }}
                pb={{ base: 4, sm: 6 }}
                templateColumns={{
                    base: '1',
                    sm: 'repeat(3, 1fr)',
                    lg: 'repeat(3, minmax(16.625rem, 1fr))',
                    '2xl': 'repeat(3, minmax(26.625rem, 1fr))',
                }}
                data-test-id={TestIdName.MainPageBlogsGrid}
            >
                {cookBlog?.map((item: Blogger) => <CookBlogCard key={item._id} author={item} />)}
            </SimpleGrid>
        </SectionLayout>
    );
};
