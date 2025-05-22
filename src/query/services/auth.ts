import { StatusCodes } from 'http-status-codes';

import { EmailFormData, EmailOTPData } from '~/components/forms/validation-scheme/email.sheme';
import { SignInFormData } from '~/components/forms/validation-scheme/sign-in.scheme';
import {
    ExtendedRecoveryFormData,
    SignUpFormData,
} from '~/components/forms/validation-scheme/sign-up.scheme';
import { setAppMessage } from '~/store/app-status/app-slice';
import { setAuthStatus } from '~/store/user/user-slice';
import { AlertMessage, ApiMessage, ApiMeta, ApiQueryErrorWithMeta } from '~/types/api-message.type';
import { ALERT_MESSAGES } from '~/utils/alert-messages';
import { AuthStatus, DEFAULT_ERROR_LOG, LocalStorageKey } from '~/utils/constant';

import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-names';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { apiSlice } from '../create-api';

export const authApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.AUTH],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            signup: builder.mutation<ApiMessage, SignUpFormData>({
                query: (data: SignUpFormData) => ({
                    url: ApiEndpoints.AUTH_SIGNUP,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.AUTH_SIGNUP,
                    body: data,
                }),
            }),
            login: builder.mutation<ApiMessage, SignInFormData>({
                query: (data: SignInFormData) => ({
                    url: ApiEndpoints.AUTH_LOGIN,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.AUTH_LOGIN,
                    body: data,
                }),
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        dispatch(setAuthStatus(AuthStatus.Auth));
                    } catch (error) {
                        const { error: apiError } = error as ApiQueryErrorWithMeta;
                        if (apiError.status === StatusCodes.UNAUTHORIZED) {
                            dispatch(setAppMessage(ALERT_MESSAGES.loginAuthError));
                        }
                        if (apiError.status === StatusCodes.FORBIDDEN) {
                            dispatch(setAppMessage(ALERT_MESSAGES.loginVerificationError));
                        }
                    }
                },
                transformResponse: (response: ApiMessage, meta: ApiMeta) => {
                    const token = meta?.response?.headers.get('Authentication-Access');
                    if (token) {
                        localStorage.setItem(LocalStorageKey.AToken, token);
                    }
                    return response;
                },
            }),
            refresh: builder.query<ApiMessage, void>({
                query: () => ({
                    url: ApiEndpoints.AUTH_REFRESH,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.AUTH_REFRESH,
                }),
                providesTags: [Tags.AUTH],
            }),
            checkAuth: builder.query<ApiMessage, void>({
                query: () => ({
                    url: ApiEndpoints.AUTH_CHECK_AUTH,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.AUTH_CHECK_AUTH,
                    credentials: 'include',
                }),
                providesTags: [Tags.AUTH],
            }),
            verifyEmail: builder.query<ApiMessage, void>({
                query: () => ({
                    url: ApiEndpoints.AUTH_VERIFY_EMAIL,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.AUTH_VERIFY_EMAIL,
                }),
                providesTags: [Tags.AUTH],
            }),
            forgotPassword: builder.mutation<ApiMessage, EmailFormData>({
                query: (data: EmailFormData) => ({
                    url: ApiEndpoints.AUTH_FORGOT_PASSWORD,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.AUTH_FORGOT_PASSWORD,
                    body: data,
                }),
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                    } catch (error) {
                        const { error: apiError } = error as ApiQueryErrorWithMeta;
                        if (apiError.status === StatusCodes.FORBIDDEN) {
                            dispatch(setAppMessage(ALERT_MESSAGES.recoveryEmailError));
                        }
                    }
                },
            }),
            verifyOTP: builder.mutation<ApiMessage, EmailOTPData>({
                query: (data: EmailOTPData) => ({
                    url: ApiEndpoints.AUTH_VERIFY_OTP,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.AUTH_VERIFY_OTP,
                    body: data,
                }),
            }),
            resetPassword: builder.mutation<AlertMessage, ExtendedRecoveryFormData>({
                query: (data: ExtendedRecoveryFormData) => ({
                    url: ApiEndpoints.AUTH_RESET_PASSWORD,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.AUTH_RESET_PASSWORD,
                    body: data,
                }),
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        dispatch(setAppMessage(ALERT_MESSAGES.recoverySuccess));
                    } catch (error) {
                        console.error(DEFAULT_ERROR_LOG, error);
                    }
                },
            }),
        }),
    });

export const {
    useSignupMutation,
    useLoginMutation,
    useRefreshQuery,
    useCheckAuthQuery,
    useLazyVerifyEmailQuery,
    useForgotPasswordMutation,
    useVerifyOTPMutation,
    useResetPasswordMutation,
} = authApiSlice;
