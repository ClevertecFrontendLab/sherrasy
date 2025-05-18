export type ApiMessage = {
    message: string;
    error?: string;
    statusText?: string;
    statusCode?: string;
    description?: string;
};

export type AlertMessage = {
    title: string;
    description?: string;
    type: 'error' | 'success';
};

export type ApiMeta = {
    response?: Response;
};

export type ApiQueryError = { status: number; data: ApiMessage };
export type ApiQueryErrorWithMeta = { error: ApiQueryError; isUnhandled: boolean; meta: unknown };
