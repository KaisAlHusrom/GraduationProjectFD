import { createSlice } from '@reduxjs/toolkit'

// Initial State
const initialState = {
    settingsDrawerOpen: false,
    adminNavbarOpen: false
}

const componentsOpenSlice = createSlice({
    name: 'componentsOpenSlice',
    initialState,
    reducers: {
        openSettingsDrawer: (state) => {
            state.settingsDrawerOpen = true;
        },
        closeSettingsDrawer: (state) => {
            state.settingsDrawerOpen = false;
        },
        openAdminNavbar: (state) => {
            state.adminNavbarOpen = true;
        },
        closeAdminNavbar: (state) => {
            state.adminNavbarOpen = false;
        },
    },
})


export const {
    openSettingsDrawer, 
    closeSettingsDrawer,
    openAdminNavbar,
    closeAdminNavbar
} = componentsOpenSlice.actions
export default componentsOpenSlice.reducer