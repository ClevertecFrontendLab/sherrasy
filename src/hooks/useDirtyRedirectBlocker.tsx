import { useEffect, useRef, useState } from 'react';
import { useBlocker } from 'react-router';

export const useDirtyRedirectBlocker = (isDirty: boolean) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [onContinue, setOnContinue] = useState<(() => void) | null>(null);
    const savedRef = useRef(false);
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            isDirty && !savedRef.current && currentLocation.pathname !== nextLocation.pathname,
    );

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setModalVisible(true);
            setOnContinue(() => blocker.proceed);
        }
    }, [blocker]);

    const confirmExitPage = () => {
        savedRef.current = true;
        setModalVisible(false);
        onContinue?.();
    };

    const cancelPageLeave = () => {
        setModalVisible(false);
        blocker.reset?.();
    };

    const markAsSaved = () => {
        savedRef.current = true;
    };

    return {
        modalVisible,
        confirmExitPage,
        cancelPageLeave,
        markAsSaved,
    };
};
