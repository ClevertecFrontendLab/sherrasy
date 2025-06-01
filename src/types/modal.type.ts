export type ModalConfig = {
    header: string;
    type: ModalType;
    bodyText?: string[];
    footerText?: string;
    icon?: string;
};

export type ModalType =
    | 'login'
    | 'exitRecipe'
    | 'imageLoad'
    | 'verification'
    | 'verificationError'
    | 'recoveryEmail'
    | 'recoveryPin'
    | 'recoveryForm';
