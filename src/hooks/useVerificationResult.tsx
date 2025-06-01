import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { AppRoute, DEFAULT_VERIFIED, LocalStorageKey } from '~/utils/constant';
import { setDataToLocalStorage } from '~/utils/helpers/localstorage-helpers';

export const useVerificationResult = () => {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const initialCheckComplete = useRef(false);

    const emailVerified = (() => {
        if (pathname !== AppRoute.Verification) return DEFAULT_VERIFIED;
        return searchParams.get('emailVerified') === 'true';
    })();
    const isVerified = emailVerified === true;
    const isVerificationFailed = emailVerified === false;

    useEffect(() => {
        setDataToLocalStorage(LocalStorageKey.VerifiedEmail, emailVerified);
        if (emailVerified === DEFAULT_VERIFIED || initialCheckComplete.current) return;
        initialCheckComplete.current = true;
        navigate(isVerified ? AppRoute.SignIn : AppRoute.SignUp);
    }, [emailVerified, isVerified, navigate]);

    return {
        emailVerified,
        isVerified,
        isVerificationFailed,
    };
};
