import { SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useGetBloggersQuery } from '~/query/services/bloggers';
import { Blogger } from '~/types/blogger.type';
import { AppRoute, CardsLimit } from '~/utils/constant';
import { getCookBlogQueryString } from '~/utils/helpers/get-request-query';
import { getCurrentId } from '~/utils/helpers/helpers';

import { CookBlogCard } from '../../cards/user-cards/cook-blog-card/cook-blog-card';
import { SectionLayout } from '../../layout/section-layout/section-layout';

export const CookBlogSection = () => {
    const currentUserId = getCurrentId() ?? '';
    const query = getCookBlogQueryString({ limit: CardsLimit.CookBlogPreview, currentUserId });
    const { data, isFetching, isError } = useGetBloggersQuery(query);
    const navigate = useNavigate();
    const handleAllClick = async () => {
        navigate(AppRoute.CookBlog);
    };
    if (isError || isFetching || !data) {
        return null;
    }
    const cookBlog = data.others;
    return (
        <SectionLayout type='cook-blog' onBtnClick={handleAllClick} isVibrant>
            <SimpleGrid
                maxW='100%'
                gap={{ base: 3, lg: 4 }}
                px={{ base: 3, md: 6 }}
                templateColumns={{
                    base: '1',
                    sm: 'repeat(3, 1fr)',
                    lg: 'repeat(3, minmax(16.625rem, 1fr))',
                    '2xl': 'repeat(3, minmax(26.625rem, 1fr))',
                }}
            >
                {cookBlog.map((item: Blogger) => (
                    <CookBlogCard key={item._id} author={item} />
                ))}
            </SimpleGrid>
        </SectionLayout>
    );
};
