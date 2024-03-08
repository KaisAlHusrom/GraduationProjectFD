import { createSlice } from '@reduxjs/toolkit'

// Initial State
const initialState = {
    openSnackbar: false,
    snackbarMessage: ""
}

const snackbarOpenSlice = createSlice({
    name: 'snackbarOpenSlice',
    initialState,
    reducers: {
        handleOpenSnackbar: (state) => {
            state.openSnackbar = true;
        },
        handleCloseSnackbar: (state) => {
            state.openSnackbar = false;
        },
        setSnackbarMessage: (state, action) => {
            state.snackbarMessage = action.payload.message;
        }
    },
})


export const { handleOpenSnackbar, handleCloseSnackbar, setSnackbarMessage} = snackbarOpenSlice.actions
export default snackbarOpenSlice.reducer