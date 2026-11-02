import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openLinearProgress: false,
    openCircularProgress: false,
}

const downloadPageSlice = createSlice({
    name: 'downloadPage',
    initialState,

    reducers: {
        handleOpenLinearProgress: (state) => {
            state.openLinearProgress = true;
        },
        handleCloseLinearProgress: (state) => {
            state.openLinearProgress = false;
        },
        handleOpenCircularProgress: (state) => {
            state.openCircularProgress = true;
        },
        handleCloseCircularProgress: (state) => {
            state.openCircularProgress = false;
        },
    }
})

export const {
    handleOpenLinearProgress, 
    handleCloseLinearProgress,
    handleOpenCircularProgress,
    handleCloseCircularProgress
} = downloadPageSlice.actions;
export default downloadPageSlice.reducer;