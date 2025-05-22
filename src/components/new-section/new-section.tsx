import { Box, Button, Heading } from '@chakra-ui/react';
import { useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/icons/icons';
import { useGetNewRecipesQuery } from '~/query/services/recipes';
import { FullRecipe } from '~/types/recipe.interface';
import { TestIdName } from '~/utils/constant';

import { RecipeCard } from '../cards/recipe-cards/recipe-card';

type NewSectionProps = {
    isRecipePage: boolean;
};

export const NewSection = ({ isRecipePage }: NewSectionProps) => {
    const swiperBreakponts = {
        0: {
            spaceBetween: 12,
        },
        480: {
            spaceBetween: 10,
        },
        768: {
            spaceBetween: 12,
        },
        1440: {
            spaceBetween: 10,
        },
        1920: {
            spaceBetween: 24,
        },
    };
    const swiperRef = useRef<SwiperType>(null);
    const { data: sortedRecipes, isError } = useGetNewRecipesQuery();
    if (!sortedRecipes || isError) {
        return <Box mt={{ base: 3.5, xs: 4, lg: '2.5rem' }} pl={0}></Box>;
    }
    return (
        <Box mt={{ base: 3.5, xs: 4, lg: '2.5rem' }} pl={isRecipePage ? 0 : { base: 2.5, sm: 5 }}>
            <Heading
                fontWeight='500'
                fontSize={{ base: '2xl', lg: '4xl', xl: '5xl' }}
                lineHeight={{ base: 8, lg: 10, '2xl': 'none' }}
                mb={{ base: '0.625rem', xs: 3, lg: '1.25rem' }}
                pr={{ base: 0, sm: 5, lg: 0 }}
            >
                Новые рецепты
            </Heading>
            <Box maxW='100%'>
                <Box
                    position='relative'
                    maxW={{ base: '330px', sm: '45.5rem', lg: '55rem', xl: '75rem' }}
                    w='100%'
                    sx={{
                        '.swiper-slide': {
                            width: 'auto',
                        },
                    }}
                >
                    <Swiper
                        data-test-id={TestIdName.Carousel}
                        modules={[Navigation]}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={6}
                        slidesPerView='auto'
                        loop={true}
                        breakpoints={swiperBreakponts}
                    >
                        {sortedRecipes.map((item: FullRecipe, i: number) => (
                            <SwiperSlide key={item._id} style={{ width: 'auto' }}>
                                <RecipeCard
                                    recipe={item}
                                    type='vertical'
                                    testI={`carousel-card-${i}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Button
                        paddingInline={0}
                        minW={{ lg: '2.5rem', '2xl': '3rem' }}
                        minH={{ lg: '2.5rem', '2xl': '3rem' }}
                        colorScheme='black'
                        display={{ base: 'none', lg: 'initial' }}
                        position='absolute'
                        top={{ lg: '37.5%', '2xl': '36%' }}
                        left='-2'
                        data-test-id={TestIdName.CarouselBack}
                        onClick={() => swiperRef.current?.slidePrev()}
                        zIndex={7}
                    >
                        <ArrowLeftIcon boxSize={{ lg: 4, '2xl': 6 }} />
                    </Button>
                    <Button
                        minW={{ lg: '2.5rem', '2xl': '3rem' }}
                        minH={{ lg: '2.5rem', '2xl': '3rem' }}
                        colorScheme='black'
                        paddingInline={0}
                        display={{ base: 'none', lg: 'initial' }}
                        position='absolute'
                        top={{ lg: '37.5%', '2xl': '36%' }}
                        right='-2'
                        data-test-id={TestIdName.CarouselForward}
                        onClick={() => swiperRef.current?.slideNext()}
                        zIndex={7}
                    >
                        <ArrowRightIcon boxSize={{ lg: 4, '2xl': 6 }} />
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
