import { createSlice } from '@reduxjs/toolkit'

// Initial State
const initialState = {
    openSnackbar: false,
    snackbarMessage: "",
    isError: false,
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
        },
        setSnackbarIsError: (state, action) => {
            state.isError = action.payload.isError;
        }
    },
})


export const { handleOpenSnackbar, handleCloseSnackbar, setSnackbarMessage, setSnackbarIsError} = snackbarOpenSlice.actions
export default snackbarOpenSlice.reducer