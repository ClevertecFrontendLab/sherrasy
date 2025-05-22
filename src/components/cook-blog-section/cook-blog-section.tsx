import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { Author } from '~/types/author.interface';
import { AppRoute } from '~/utils/constant';
import { cookBlog } from '~/utils/data/mock-cards.json';

import { CookBlogCard } from '../cards/user-cards/cook-blog-card';
import { SectionLayout } from '../layout/section-layout';

export const CookBlogSection = () => {
    const navigate = useNavigate();
    const handleAllClick = async () => {
        navigate(AppRoute.Main);
    };
    return (
        <SectionLayout type='cook-blog' onBtnClick={handleAllClick} isVibrant>
            <Flex
                maxW='100%'
                gap={{ base: 3, lg: 4 }}
                px={{ base: 3, md: 6 }}
                justifyContent='space-between'
                flexDirection={{ base: 'column', sm: 'row' }}
            >
                {cookBlog.map((item: Author) => (
                    <CookBlogCard key={item.id} author={item} />
                ))}
            </Flex>
        </SectionLayout>
    );
};
