import 'swiper/swiper-bundle.css';

import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { showAlertToast } from '~/components/alert-error/show-alert';
import { OverlayWithLoader } from '~/components/overlay/overlayWithLoader';
import { JuicyPage } from '~/pages/juicy-page';
import { MainPage } from '~/pages/main-page';
import { NotFoundPage } from '~/pages/not-found-page';
import { RecipePage } from '~/pages/recipe-page';
import { VeganPage } from '~/pages/vegan-page';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { getAppError, getAppLoading } from '~/store/app-status/selectors';
import { useAppSelector } from '~/store/hooks';
import { AppRoute } from '~/utils/constant';

function App() {
    const { isFetching: isCatLoading } = useGetCategoriesQuery();
    const isLoading = useAppSelector(getAppLoading);
    const appError = useAppSelector(getAppError);

    const toast = useToast();

    useEffect(() => {
        if (appError) {
            showAlertToast(toast);
        }
    }, [appError, toast]);

    return (
        <>
            <OverlayWithLoader isOpen={isCatLoading || isLoading} />
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
