export const getSlidesPerView = (screenWidth) => {
    switch (screenWidth) {
    case 'xs':
        return 1;
    case 'sm':
        return 2;
    case 'md':
        return 3;
    case 'lg':
    default:
        return 4;
    }
};