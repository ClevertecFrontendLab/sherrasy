import 'swiper/swiper-bundle.css';

import { Navigate, Route, Routes } from 'react-router';

import { OverlayWithLoader } from '~/components/overlay/overlayWithLoader';
import JuicyPage from '~/pages/juicy-page';
import MainPage from '~/pages/main-page';
import NotFoundPage from '~/pages/not-found-page';
import RecipePage from '~/pages/recipe-page';
import VeganPage from '~/pages/vegan-page';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useGetNewRecipesQuery } from '~/query/services/recipes';
import { AppRoute } from '~/utils/constant';

function App() {
    const { isLoading: isCategoriesLoading } = useGetCategoriesQuery();
    const { isLoading: isNewRecipesLoading } = useGetNewRecipesQuery();

    return (
        <>
            <OverlayWithLoader isOpen={isCategoriesLoading || isNewRecipesLoading} />
            <Routes>
                <Route path={AppRoute.Main} element={<MainPage />} />
                <Route path={AppRoute.Vegan} element={<VeganPage />} />
                <Route path={AppRoute.Juiciest} element={<JuicyPage />} />
                <Route path={AppRoute.Recipe} element={<RecipePage />} />
                <Route path={`${AppRoute.Juiciest}${AppRoute.Recipe}`} element={<RecipePage />} />
                <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
                <Route path='*' element={<Navigate to={AppRoute.NotFound} replace />} />
            </Routes>
        </>
    );
}

export default App;
