import { RouteObject } from 'react-router';

import { PrivateRoute } from './private-route';

export const protectedRoute = (element: React.ReactNode): RouteObject['element'] => (
    <PrivateRoute>{element}</PrivateRoute>
);

export const publicRoute = (element: React.ReactNode): RouteObject['element'] => element;
