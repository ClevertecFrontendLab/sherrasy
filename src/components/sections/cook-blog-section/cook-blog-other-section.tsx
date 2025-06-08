import { SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { CookBlogCard } from '~/components/cards/user-cards/cook-blog-card/cook-blog-card';
import { SectionLayout } from '~/components/layout/section-layout/section-layout';
import { Blogger } from '~/types/blogger.type';
import { AppRoute } from '~/utils/constant';

export const CookBlogOtherSection = ({ bloggers }: { bloggers: Blogger[] }) => {
    const navigate = useNavigate();
    const handleAllClick = async () => {
        navigate(AppRoute.CookBlog);
    };

    return (
        <SectionLayout type='cook-blog' title='Другие блоги' onBtnClick={handleAllClick} btnHidden>
            <SimpleGrid
                maxW='100%'
                gap={{ base: 3, lg: 4 }}
                px={3}
                py={{ base: 4, sm: 6 }}
                templateColumns={{
                    base: '1',
                    sm: 'repeat(3, 1fr)',
                    lg: 'repeat(3, minmax(16.625rem, 1fr))',
                    '2xl': 'repeat(3, minmax(26.625rem, 1fr))',
                }}
            >
                {bloggers.map((item: Blogger) => (
                    <CookBlogCard key={item._id} author={item} isExtended type='others' />
                ))}
            </SimpleGrid>
        </SectionLayout>
    );
};
