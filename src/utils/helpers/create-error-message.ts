import { StatusCodes } from 'http-status-codes';

import { AlertMessage, ApiMessage } from '~/types/api-message.type';

import { ALERT_MESSAGES } from '../alert-messages';

type CreateErrorProps = {
    status: number;
    data: ApiMessage;
    isAuth: boolean;
    isFiltering: boolean;
    isClientError: boolean;
};

export const createErrorMessage = ({
    status,
    data,
    isAuth,
    isFiltering,
    isClientError,
}: CreateErrorProps): AlertMessage => {
    const isRecipesNotFound = !isAuth && status === StatusCodes.NOT_FOUND;

    if (isFiltering || isRecipesNotFound) {
        return ALERT_MESSAGES.searchError;
    }

    if (isClientError) {
        return {
            id: `${status}-${data.statusText}`,
            title: data.message,
            description: data.description ?? '',
            type: 'error',
        };
    }

    return ALERT_MESSAGES.serverError;
};
