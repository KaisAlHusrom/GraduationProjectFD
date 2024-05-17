// store.js
import { configureStore } from '@reduxjs/toolkit';

//Slices
import DownloadPageSlice from './Slices/DownloadPageSlice';
import LangSlice from './Slices/LangSlice';
import modeSlice from './Slices/modeSlice';
import componentsOpenSlice from './Slices/componentsOpenSlice';
import snackbarOpenSlice from './Slices/snackbarOpenSlice';
// import confirmModalSlice from './Slices/confirmModalSlice';

const store = configureStore({
  reducer: {
    downloadPageSlice: DownloadPageSlice,
    langSlice: LangSlice,
    modeSlice: modeSlice,
    componentsOpenSlice: componentsOpenSlice,
    snackbarOpenSlice: snackbarOpenSlice,
    // confirmModalSlice: confirmModalSlice,
  },
  
});

export default store;