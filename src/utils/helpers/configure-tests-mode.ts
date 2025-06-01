import { MotionGlobalConfig } from 'framer-motion';

const cypressIsRunning = (): boolean => !!(window as unknown as { Cypress: unknown }).Cypress;

export const configureTestMode = (): void => {
    if (cypressIsRunning()) {
        MotionGlobalConfig.skipAnimations = true;
    }
    return;
};
