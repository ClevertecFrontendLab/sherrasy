import { SimpleGrid } from '@chakra-ui/react';

import { Blogger } from '~/types/blogger.type';

import { CookBlogCard } from '../../cards/user-cards/cook-blog-card/cook-blog-card';
import { SectionLayout } from '../../layout/section-layout/section-layout';

type CookBlogListSectionProps = {
    type: 'favorite' | 'others';
    data: Blogger[];
    btnHidden?: boolean;
    handleShowAll?: () => void;
};

export const CookBlogListSection = ({
    type,
    data,
    handleShowAll,
    btnHidden,
}: CookBlogListSectionProps) => {
    const isFavorite = type === 'favorite';
    const columnParams = isFavorite
        ? 'repeat(2, minmax(40.5rem, 1fr))'
        : 'repeat(3, minmax(26.625rem, 1fr))';
    if (!data.length) {
        return null;
    }
    const isBtnVisible = data.length <= 9;
    return (
        <SectionLayout
            type={`cook-blog-${type}`}
            isDull={!isFavorite}
            isVibrant={isFavorite}
            onBtnClick={handleShowAll}
            btnHidden={btnHidden}
        >
            <SimpleGrid
                maxW='100%'
                gap={{ base: 3, lg: 4 }}
                px={{ base: 3, md: 6 }}
                py={isBtnVisible ? {} : { base: 4, sm: 6 }}
                pt={isBtnVisible ? { base: 4, sm: 6 } : {}}
                templateColumns={{
                    base: '1',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(2, minmax(16.625rem, 1fr))',
                    '2xl': columnParams,
                }}
            >
                {data.map((item: Blogger) => (
                    <CookBlogCard key={item._id} author={item} isExtended type={type} />
                ))}
            </SimpleGrid>
        </SectionLayout>
    );
};
