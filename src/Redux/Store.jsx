// store.js
import { configureStore } from '@reduxjs/toolkit';

//Slices
import DownloadPageSlice from './Slices/DownloadPageSlice';
import LangSlice from './Slices/LangSlice';
import modeSlice from './Slices/modeSlice';
import componentsOpenSlice from './Slices/componentsOpenSlice';

const store = configureStore({
  reducer: {
    downloadPageSlice: DownloadPageSlice,
    langSlice: LangSlice,
    modeSlice: modeSlice,
    componentsOpenSlice: componentsOpenSlice
  },
});

export default store;