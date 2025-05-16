import { ReactNode } from 'react';
import { Navigate } from 'react-router';

import { useAppSelector } from '~/store/hooks';
import { getIsAuthorized } from '~/store/user/selectors';
import { AppRoute } from '~/utils/constant';

type PrivateRouteProps = {
    children: ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuthorized = useAppSelector(getIsAuthorized);

    return isAuthorized ? children : <Navigate to={AppRoute.SignIn} />;
};
