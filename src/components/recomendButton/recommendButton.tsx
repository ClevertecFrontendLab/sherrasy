import { Button } from '@chakra-ui/react';
import { useState } from 'react';

import { RecommendIcon } from '~/assets/icons/icons';
import { useRecommendRecipeMutation } from '~/query/services/recipe';
import { getCurrentUserId } from '~/utils/helpers/blogger-author-helpers';

type RecomendBtnProps = {
    id: string;
    recomendations?: string[];
    totalBookmarks?: number;
    totalSubscribers?: number;
};

export const RecommendButton = ({
    id,
    recomendations = [],
    totalBookmarks = 0,
    totalSubscribers = 0,
}: RecomendBtnProps) => {
    const [recomendRecipe, { isLoading }] = useRecommendRecipeMutation();
    const [isRecommended, setIsRecommended] = useState(false);
    const currentUserId = getCurrentUserId() ?? '';
    if (totalBookmarks < 200 && totalSubscribers < 100) return null;

    const isRecomendedByCurentUser = isRecommended || recomendations.includes(currentUserId);

    const handleClickBtn = () => {
        setIsRecommended(true);
        recomendRecipe(id);
    };

    return (
        <Button
            onClick={handleClickBtn}
            leftIcon={<RecommendIcon />}
            isLoading={isLoading}
            variant={isRecomendedByCurentUser ? 'outline' : 'solid'}
            colorScheme='black'
            width='100%'
            maxW={['19.375rem', '20.5rem', '37.25rem', '37.75rem', '36.125rem', null, '41.75rem']}
            mt={{ base: 6, lg: 10 }}
        >
            {isRecomendedByCurentUser ? 'Вы порекомендовали' : 'Рекомендовать рецепт'}
        </Button>
    );
};
