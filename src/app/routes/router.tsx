import { createBrowserRouter, Navigate } from 'react-router';

import { EditRecipePage } from '~/pages/edit-recipe-page';
import { JuicyPage } from '~/pages/juicy-page';
import { MainPage } from '~/pages/main-page';
import { NewRecipePage } from '~/pages/new-recipe-page';
import { NotFoundPage } from '~/pages/not-found-page';
import { RecipePage } from '~/pages/recipe-page';
import { SignInPage } from '~/pages/sign-in-page';
import { SignUpPage } from '~/pages/sign-up-page';
import { VeganPage } from '~/pages/vegan-page';
import { AppRoute } from '~/utils/constant';

import { protectedRoute, publicRoute } from './helper-routes';

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
        path: AppRoute.NewRecipe,
        element: protectedRoute(<NewRecipePage />),
    },
    {
        path: AppRoute.EditRecipe,
        element: protectedRoute(<EditRecipePage />),
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
        path: AppRoute.Verification,
        element: publicRoute(<SignUpPage />),
    },
    {
        path: '*',
        element: <Navigate to={AppRoute.NotFound} replace />,
    },
]);

export default router;
