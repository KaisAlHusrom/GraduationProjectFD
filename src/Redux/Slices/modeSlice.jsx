import { createSlice } from "@reduxjs/toolkit";

// // Function to check media query
// const checkMediaQuery = () => {
//     console.log(window.matchMedia('(prefers-color-scheme: dark)'))
//     return window.matchMedia('(prefers-color-scheme: dark)');
// };

// Create a function to retrieve values from localStorage
const getLocalStorageData = () => {
    const mode = localStorage.getItem("mode");
    return {
        mode: mode || "dark", // Use default value if not in localStorage
    };
};


// Get initial state from localStorage or defaults
const initialState = getLocalStorageData();

const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        changeMode: (state, action) => {
            state.mode = action.payload.mode;
            localStorage.setItem("mode", action.payload.mode); // Update localStorage
        }
    },
});

export const { changeMode} = modeSlice.actions;
export default modeSlice.reducer;