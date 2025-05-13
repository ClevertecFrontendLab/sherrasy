import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { AppRoute } from '~/utils/constant';

export const useVerificationResult = () => {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const isVerificationPage = pathname === AppRoute.Verification;
    const emailVerified = !isVerificationPage || searchParams.get('emailVerified') === 'true';

    useEffect(() => {
        if (!isVerificationPage) return;

        if (emailVerified) {
            navigate(AppRoute.SignIn);
        }
    }, [isVerificationPage, emailVerified, navigate]);

    return { emailVerified };
};
