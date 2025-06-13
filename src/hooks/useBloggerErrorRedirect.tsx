import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { StatusCodes } from 'http-status-codes';
import { useNavigate } from 'react-router';

import { AppRoute } from '~/utils/constant';

export const useBloggerErrorRedirect = () => {
    const navigate = useNavigate();

    const isFetchError = (error: unknown): error is FetchBaseQueryError =>
        typeof error === 'object' && error !== null && 'status' in error;

    const isNotFoundError = (error: unknown) =>
        isFetchError(error) && error.status === StatusCodes.NOT_FOUND;

    const isOtherError = (error: unknown) =>
        isFetchError(error) && error.status !== StatusCodes.NOT_FOUND;

    const redirectToNotFound = () => navigate(AppRoute.NotFound, { replace: true });

    const redirectToMain = () => navigate(AppRoute.Main, { replace: true });
    const handleErrors = (errors: {
        errorBlogger: unknown;
        errorRecipes: unknown;
        isBloggerError: boolean;
        isRecipesError: boolean;
        isBloggersError: boolean;
    }) => {
        const { errorBlogger, errorRecipes, isBloggerError, isRecipesError, isBloggersError } =
            errors;

        const shouldShowNotFound =
            (isBloggerError && isNotFoundError(errorBlogger)) ||
            (isRecipesError && isNotFoundError(errorRecipes));

        if (shouldShowNotFound) {
            return redirectToNotFound();
        }

        const shouldRedirectToMain =
            (isBloggerError && isOtherError(errorBlogger)) ||
            (isRecipesError && isOtherError(errorRecipes)) ||
            isBloggersError;

        if (shouldRedirectToMain) {
            return redirectToMain();
        }
    };

    return { handleErrors };
};
