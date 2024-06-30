import { useCallback, useRef, useState } from "react";

const useInView = () => {
    const observer = useRef(null); // Initialize with null
    const [inView, setInView] = useState(false);

    
    const handleIntersection = useCallback((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setInView(true);
            } else {
                // setInView(false); // Set inView to false when not intersecting
            }
        });
    }, []);

    const ref = useCallback((node) => {
        if (!node) return;

        observer.current = new IntersectionObserver(handleIntersection);

        observer.current.observe(node);

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [handleIntersection]);

    return { inView, ref };
};

export default useInView;
