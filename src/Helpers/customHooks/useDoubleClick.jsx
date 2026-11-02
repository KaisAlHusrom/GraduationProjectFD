import { useRef } from "react";

export const useDoubleClick = (onClick, onDbClick, delay = 250) => {
    const timePassed= useRef(0);
    return (e) => {
        if (e.detail === 1) {
            setTimeout(() => {
                if (Date.now() - timePassed.current >= delay) {
                    onClick();
                }
            }, delay)
        }
    
        if (e.detail === 2) {
        timePassed.current = Date.now();
        onDbClick();
        }
    }
}