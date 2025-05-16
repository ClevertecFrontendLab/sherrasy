export type ApiMessage = {
    message: string;
    error?: string;
    statusText?: string;
    statusCode?: string;
};

export type AlertMessage = {
    title: string;
    description?: string;
    type: 'error' | 'success';
};

export type ApiMeta = {
    response?: Response;
};
