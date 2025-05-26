import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

import { OverlayWithLoader } from '~/components/layout/overlay/overlayWithLoader';
import { useCheckAuthQuery } from '~/query/services/auth';
import { useAppSelector } from '~/store/hooks';
import { getIsAuthorized } from '~/store/user/selectors';
import { AppRoute, LocalStorageKey } from '~/utils/constant';

type PrivateRouteProps = PropsWithChildren;

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isLoading, isSuccess } = useCheckAuthQuery();
    const aToken = localStorage.getItem(LocalStorageKey.AToken);
    const isAuthorized = useAppSelector(getIsAuthorized);
    if (isLoading) {
        return <OverlayWithLoader isOpen={isLoading} />;
    }
    return isAuthorized || isSuccess || aToken ? children : <Navigate to={AppRoute.SignIn} />;
};

export const PublicRoute = ({ children }: PrivateRouteProps) => {
    const { isLoading, isSuccess } = useCheckAuthQuery();
    const isAuthorized = useAppSelector(getIsAuthorized);
    if (isLoading) {
        return <OverlayWithLoader isOpen={isLoading} />;
    }
    return !isAuthorized || !isSuccess ? children : <Navigate to={AppRoute.Main} />;
};
