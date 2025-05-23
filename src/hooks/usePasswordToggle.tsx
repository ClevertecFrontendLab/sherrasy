import { useState } from 'react';

export const usePasswordToggle = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handlers = {
        onMouseDown: () => setShowPassword(true),
        onMouseUp: () => setShowPassword(false),
        onMouseLeave: () => setShowPassword(false),
        onTouchStart: () => setShowPassword(true),
        onTouchEnd: () => setShowPassword(false),
    };

    return {
        showPassword,
        handlers,
    };
};
