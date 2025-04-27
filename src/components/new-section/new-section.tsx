import { Box, Button, Heading } from '@chakra-ui/react';
import { useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowLeftIcon, ArrowRightIcon } from '~/assets/icons/icons';
import { useAppSelector } from '~/store/hooks';
import { getRecipes } from '~/store/recipes/selectors';
import { FullRecipe } from '~/types/recipe.interface';
import { getSortedNewRecipes } from '~/utils/helpers';

import RecipeCard from '../cards/recipe-cards/recipe-card';

function NewSection() {
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
    const recipes = useAppSelector(getRecipes);
    if (!recipes) {
        return <Heading>An error occured</Heading>;
    }
    const currentRecipes = getSortedNewRecipes(recipes);

    return (
        <Box
            mt={{ base: 3.5, xs: 4, lg: '2.5rem' }}
            pl={{ base: 4, sm: 5, lg: '17.75rem' }}
            pr={{ base: 0, sm: 5, lg: '17.375rem' }}
        >
            <Heading
                fontWeight='500'
                fontSize={{ base: '2xl', lg: '4xl', xl: '5xl' }}
                lineHeight={{ base: 8, lg: 10, '2xl': 'none' }}
                mb={{ base: '0.625rem', xs: 3, lg: '1.25rem' }}
            >
                Новые рецепты
            </Heading>
            <Box
                position='relative'
                maxW={{ base: '342px', sm: '45.5rem', lg: '55rem', xl: '85rem' }}
                w='100%'
                sx={{
                    '.swiper-slide': {
                        width: 'auto !important',
                    },
                }}
            >
                <Swiper
                    data-test-id='carousel'
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={6}
                    slidesPerView='auto'
                    loop={true}
                    breakpoints={swiperBreakponts}
                >
                    {currentRecipes.map((item: FullRecipe, i: number) => (
                        <SwiperSlide key={item.id} style={{ width: 'auto' }}>
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
                    bg='black'
                    colorScheme='black'
                    display={{ base: 'none', lg: 'initial' }}
                    position='absolute'
                    top={{ lg: '37.5%', '2xl': '36%' }}
                    left='-2'
                    data-test-id='carousel-back'
                    onClick={() => swiperRef.current?.slidePrev()}
                    zIndex={7}
                >
                    <ArrowLeftIcon boxSize={{ lg: 4, '2xl': 6 }} />
                </Button>
                <Button
                    minW={{ lg: '2.5rem', '2xl': '3rem' }}
                    minH={{ lg: '2.5rem', '2xl': '3rem' }}
                    bg='black'
                    colorScheme='black'
                    paddingInline={0}
                    display={{ base: 'none', lg: 'initial' }}
                    position='absolute'
                    top={{ lg: '37.5%', '2xl': '36%' }}
                    right='-2'
                    data-test-id='carousel-forward'
                    onClick={() => swiperRef.current?.slideNext()}
                    zIndex={7}
                >
                    <ArrowRightIcon boxSize={{ lg: 4, '2xl': 6 }} />
                </Button>
            </Box>
        </Box>
    );
}
export default NewSection;
