export const isTokenValid = () => {
    const token = sessionStorage.getItem('auth_token');
    const expirationTime = sessionStorage.getItem('token_expiration');

    if (!token || !expirationTime) {
        localStorage.removeItem('user');

        return false;
    }

    const now = new Date().getTime();
    if (now > expirationTime) {
        localStorage.removeItem('user');

        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('token_expiration');
        
        return false;
    }

    return true;
};