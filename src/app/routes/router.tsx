import { createBrowserRouter, Navigate } from 'react-router';

import { JuicyPage } from '~/pages/juicy-page';
import { MainPage } from '~/pages/main-page';
import { NotFoundPage } from '~/pages/not-found-page';
import { RecipePage } from '~/pages/recipe-page';
import { VeganPage } from '~/pages/vegan-page';
import { AppRoute } from '~/utils/constant';

const router = createBrowserRouter([
    {
        path: AppRoute.Main,
        element: <MainPage />,
    },
    {
        path: AppRoute.Vegan,
        element: <VeganPage />,
    },
    {
        path: AppRoute.Juiciest,
        element: <JuicyPage />,
    },
    {
        path: AppRoute.Recipe,
        element: <RecipePage />,
    },
    {
        path: AppRoute.NotFound,
        element: <NotFoundPage />,
    },
    {
        path: '*',
        element: <Navigate to={AppRoute.NotFound} replace />,
    },
]);

export default router;
