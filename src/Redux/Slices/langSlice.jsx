import { createSlice } from "@reduxjs/toolkit";

// Create a function to retrieve values from localStorage
const getLocalStorageData = () => {
    const language = localStorage.getItem("language");
    return {
        lang: language || "en", // Use default value if not in localStorage
    };
};


// Get initial state from localStorage or defaults
const initialState = {
    ...getLocalStorageData(),
    dir: getLocalStorageData().lang === "ar" ? "rtl" : "ltr",
};

const langSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        changeLang: (state, action) => {
            state.lang = action.payload.lang;
            localStorage.setItem("language", action.payload.lang); // Update localStorage
        }
    },
});

export const { changeLang} = langSlice.actions;
export default langSlice.reducer;