export const useSubmitOnEnter =
    (isValid: boolean, onSubmit: () => void) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isValid) {
            e.preventDefault();
            onSubmit();
        }
    };
