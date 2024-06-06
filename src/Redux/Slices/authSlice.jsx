import { createSlice } from '@reduxjs/toolkit'

const getInitialStateFromSessionStorage = () => {
    const auth_token = sessionStorage.getItem('auth_token');
    const user = sessionStorage.getItem('user');
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    return {
        auth_token: auth_token ? auth_token : null,
        user: user ? JSON.parse(user) : null,
        isAuthenticated: isAuthenticated,
    };
};


// Initial State
const initialState = getInitialStateFromSessionStorage();


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthInfo: (state, action) => {
            const { token, user } = action.payload;
            sessionStorage.setItem('auth_token', token)
            state.user = user;
            state.auth_token = token;
            state.isAuthenticated = true;
        },
    },
})


export const { setAuthInfo } = authSlice.actions
export default authSlice.reducer