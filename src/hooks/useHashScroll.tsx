import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const useHashScroll = () => {
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) return;
        const element = document.getElementById(location.hash.substring(1));
        if (!element) return;

        const observer = new ResizeObserver(() => {
            element.scrollIntoView({ behavior: 'smooth' });
        });

        let parent: HTMLElement | null = element;
        while (parent) {
            observer.observe(parent);
            parent = parent.parentElement;
        }

        return () => observer.disconnect();
    }, [location.hash]);
};
