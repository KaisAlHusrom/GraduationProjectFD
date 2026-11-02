export const getSlidesPerView = (screenWidth) => {
    switch (screenWidth) {
    case 'xs':
        return 1;
    case 'sm':
        return 2;
    case 'md':
        return 2;
    case 'lg':
        return 3;
    case 'xl':
        return 4;
    default:
        return 3;
    }
};

export const getSlidesPerViewProfilePage = (screenWidth) => {
    switch (screenWidth) {
    case 'xs':
        return 1;
    case 'sm':
        return 2;
    case 'md':
        return 2;
    case 'xl':
    case 'lg':
        return 2;
    default:
        return 3;
    }
};