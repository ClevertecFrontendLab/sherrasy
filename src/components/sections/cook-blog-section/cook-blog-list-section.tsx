import { Button, Flex, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/icons/icons';
import { Blogger } from '~/types/blogger.type';
import { CardsLimit } from '~/utils/constant';
import { TestIdName } from '~/utils/testId-name.enum';

import { CookBlogCard } from '../../cards/user-cards/cook-blog-card/cook-blog-card';
import { SectionLayout } from '../../layout/section-layout/section-layout';

type CookBlogListSectionProps = {
    type: 'favorite' | 'others';
    data: Blogger[];
    handleChangeShowed?: (value: string | number) => void;
};

export const CookBlogListSection = ({
    type,
    data,
    handleChangeShowed,
}: CookBlogListSectionProps) => {
    const [isAllVisible, setIsAllVisible] = useState(false);
    const [isDesktop] = useMediaQuery('(min-width: 1920px)');
    const isFavorite = type === 'favorite';
    const columnParams = isFavorite
        ? 'repeat(2, minmax(40.5rem, 1fr))'
        : 'repeat(3, minmax(23.5rem, 26.625rem))';
    const titleParam = isFavorite ? 'Избранные блоги' : null;
    if (!data?.length) return null;

    const getVisibleItems = () => {
        if (isFavorite || isAllVisible) return data;
        return isDesktop
            ? data.slice(0, CardsLimit.CookBlogOthers)
            : data.slice(0, CardsLimit.Default);
    };

    const visibleItems = getVisibleItems();
    const shouldHideButton = !isFavorite && data.length <= 9;

    const handleMoreClick = () => {
        const newLimit = data.length <= 9 ? CardsLimit.All : CardsLimit.CookBlogOthers;

        handleChangeShowed?.(newLimit);
        setIsAllVisible((prev) => !prev);
    };
    return (
        <SectionLayout
            type={`cook-blog-${type}`}
            title={titleParam}
            isDull={!isFavorite}
            isVibrant={isFavorite}
            onBtnClick={handleMoreClick}
        >
            <Flex direction='column' w='100%'>
                <SimpleGrid
                    w='100%'
                    maxW='100%'
                    gap={{ base: 3, lg: 4 }}
                    px={{ base: 3, md: 6 }}
                    pb={shouldHideButton ? {} : { base: 4, sm: 6 }}
                    templateColumns={{
                        base: '1',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(2, minmax(16.625rem, 1fr))',
                        xl: columnParams,
                    }}
                    data-test-id={
                        isFavorite ? TestIdName.BlogsFavoritesGrid : TestIdName.BlogsOthersGrid
                    }
                >
                    {visibleItems.map((item: Blogger) => (
                        <CookBlogCard key={item._id} author={item} isExtended type={type} />
                    ))}
                </SimpleGrid>

                {!isFavorite && (
                    <Flex p={4} justifyContent='center'>
                        <Button
                            size='md'
                            bg='transparent'
                            onClick={handleMoreClick}
                            rightIcon={isAllVisible ? undefined : <ArrowRightIcon />}
                            leftIcon={isAllVisible ? <ArrowLeftIcon /> : undefined}
                            display={{ base: 'flex', lg: 'inherit' }}
                            alignItems='center'
                            data-test-id={TestIdName.BlogsOthersButton}
                        >
                            <Text
                                fontWeight={600}
                                fontSize={{ base: 'md', '2xl': 'lg' }}
                                lineHeight={{ base: 6, '2xl': 7 }}
                            >
                                {isAllVisible ? 'Свернуть' : 'Все авторы'}
                            </Text>
                        </Button>
                    </Flex>
                )}
            </Flex>
        </SectionLayout>
    );
};
