import { createBrowserRouter, Navigate } from 'react-router';

import { JuicyPage } from '~/pages/juicy-page';
import { MainPage } from '~/pages/main-page';
import { NotFoundPage } from '~/pages/not-found-page';
import { RecipePage } from '~/pages/recipe-page';
import { SignInPage } from '~/pages/sign-in-page';
import { SignUpPage } from '~/pages/sign-up-page';
import { VeganPage } from '~/pages/vegan-page';
import { AppRoute } from '~/utils/constant';

import { protectedRoute, publicRoute } from './private-route';

const router = createBrowserRouter([
    {
        path: AppRoute.Main,
        element: protectedRoute(<MainPage />),
    },
    {
        path: AppRoute.Vegan,
        element: protectedRoute(<VeganPage />),
    },
    {
        path: AppRoute.Juiciest,
        element: protectedRoute(<JuicyPage />),
    },
    {
        path: AppRoute.Recipe,
        element: protectedRoute(<RecipePage />),
    },
    {
        path: AppRoute.NotFound,
        element: protectedRoute(<NotFoundPage />),
    },
    {
        path: AppRoute.SignIn,
        element: publicRoute(<SignInPage />),
    },
    {
        path: AppRoute.SignUp,
        element: publicRoute(<SignUpPage />),
    },

    {
        path: '*',
        element: <Navigate to={AppRoute.NotFound} replace />,
    },
]);

export default router;
