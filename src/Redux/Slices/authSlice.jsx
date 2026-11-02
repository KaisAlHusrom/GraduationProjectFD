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
        setUserInfo: (state, action) => {
            const { user } = action.payload;
            state.user = user;
            sessionStorage.setItem('user', JSON.stringify(user))
        },
        setTokenInfo: (state, action) => {
            const { token } = action.payload;
            sessionStorage.setItem('auth_token', token)
            state.auth_token = token;
            state.isAuthenticated = true;
        },
        logoutRedux: (state) => {
            state.user = null;
            state.auth_token = null;
            state.isAuthenticated = false;
            sessionStorage.removeItem('auth_token')
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('isAuthenticated')
        }
    },
})


export const { setUserInfo, setTokenInfo, logoutRedux } = authSlice.actions
export default authSlice.reducer