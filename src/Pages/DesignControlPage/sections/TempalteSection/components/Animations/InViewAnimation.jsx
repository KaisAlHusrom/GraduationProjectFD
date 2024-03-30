import { useEffect, useState } from 'react';

const InViewAnimation = ({ children, animationName, enabled }) => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('counters-section');
            if (section && isElementInViewport(section)) {
                setIsInView(true);
            }
        };

        if (enabled) {
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [enabled]);

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    return (
        <div className={enabled && isInView ? `animate__animated animate__${animationName}` : ''}>
            {children}
        </div>
    );
};

export default InViewAnimation;
