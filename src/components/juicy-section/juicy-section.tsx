import { SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useGetJuiciestRecipesQuery } from '~/query/services/recipes';
import { FullRecipe } from '~/types/recipe.interface';
import { AppRoute, CardsLimit, SortingBy, SortingDirection } from '~/utils/constant';
import { getRecipeQueryString } from '~/utils/helpers';

import { RecipeCard } from '../cards/recipe-cards/recipe-card';
import { SectionLayout } from '../layout/section-layout';

export const JuicySection = () => {
    const query = getRecipeQueryString({
        limit: CardsLimit.JuicyPreview,
        page: 1,
        sortBy: SortingBy.Likes,
        sortOrder: SortingDirection.Descending,
    });
    const { data: JuiciestData } = useGetJuiciestRecipesQuery(query);
    const currentRecipes = JuiciestData?.data ?? [];
    const navigate = useNavigate();
    const handleAllClick = async () => {
        navigate(AppRoute.Juiciest);
    };

    return (
        <SectionLayout type='juiciest' onBtnClick={handleAllClick}>
            <SimpleGrid
                spacing={{ base: 2.5, xs: 3, md: '14px', lg: 4, '2xl': 5 }}
                spacingY={{ '2xl': 6 }}
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(1, 1fr)',
                    xl: 'repeat(2, 1fr)',
                }}
                gridAutoRows='1fr'
            >
                {currentRecipes.slice(0, 4).map((item: FullRecipe, i: number) => (
                    <RecipeCard key={item._id} recipe={item} type='horizontal' testI={`${i}`} />
                ))}
            </SimpleGrid>
        </SectionLayout>
    );
};
