export type ModalConfig = {
    header: string;
    type: ModalType;
    bodyText?: string[];
    footerText?: string;
    icon?: string;
};

export type ModalType =
    | 'login'
    | 'verification'
    | 'verificationError'
    | 'recoveryEmail'
    | 'recoveryPin'
    | 'recoveryForm';
