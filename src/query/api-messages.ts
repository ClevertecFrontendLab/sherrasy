import { StatusCodes } from 'http-status-codes';

import { AlertMessage } from '~/types/api-message.type';
import { ALERT_MESSAGES } from '~/utils/alert-messages';

import { EndpointNames } from './constants/endpoint-names';

type StatusMessages = {
    [status: number]: AlertMessage;
};

type APIMessages = {
    [key in EndpointNames]?: StatusMessages;
};

export const API_MESSAGES: APIMessages = {
    [EndpointNames.CREATE_RECIPE]: {
        [StatusCodes.CREATED]: ALERT_MESSAGES.publishRecipeSuccess,
        [StatusCodes.CONFLICT]: ALERT_MESSAGES.publishRecipeNameError,
        [StatusCodes.INTERNAL_SERVER_ERROR]: ALERT_MESSAGES.publishRecipeError,
    },
    [EndpointNames.UPDATE_RECIPE]: {
        [StatusCodes.CREATED]: ALERT_MESSAGES.publishRecipeSuccess,
        [StatusCodes.CONFLICT]: ALERT_MESSAGES.publishRecipeNameError,
        [StatusCodes.INTERNAL_SERVER_ERROR]: ALERT_MESSAGES.publishRecipeError,
    },
    [EndpointNames.SAVE_RECIPE_DRAFT]: {
        [StatusCodes.CREATED]: ALERT_MESSAGES.publishDraftSuccess,
        [StatusCodes.CONFLICT]: ALERT_MESSAGES.publishRecipeNameError,
        [StatusCodes.INTERNAL_SERVER_ERROR]: ALERT_MESSAGES.publishDraftError,
    },
    [EndpointNames.DELETE_RECIPE]: {
        [StatusCodes.OK]: ALERT_MESSAGES.removeRecipeSuccess,
        [StatusCodes.INTERNAL_SERVER_ERROR]: ALERT_MESSAGES.removeRecipeError,
    },
};
