export type ApiMessage = {
    message: string;
    error?: string;
    statusText?: string;
    statusCode?: string;
    description?: string;
};

export type AlertMessage = {
    title: string;
    type: 'error' | 'success';
    description?: string;
};

export type ApiMeta = {
    response?: Response;
};

export type ApiQueryError = { status: number; data: ApiMessage };
export type ApiQueryErrorWithMeta = { error: ApiQueryError; isUnhandled: boolean; meta: unknown };
