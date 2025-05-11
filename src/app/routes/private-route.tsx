import { ReactNode } from 'react';
import { Navigate, RouteObject } from 'react-router';

import { AppRoute } from '~/utils/constant';

type PrivateRouteProps = {
    children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuthorized = true; //temp

    return isAuthorized ? children : <Navigate to={AppRoute.SignIn} />;
};

export const protectedRoute = (element: React.ReactNode): RouteObject['element'] => (
    <PrivateRoute>{element}</PrivateRoute>
);

export const publicRoute = (element: React.ReactNode): RouteObject['element'] => element;
