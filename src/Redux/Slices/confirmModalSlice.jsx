// import { createSlice } from '@reduxjs/toolkit'

// // Initial State
// const initialState = {
//     modalOpenState: false, 
//     title: "",  
//     confirmMessage: "", 
//     actionHandlers: {
//         handleAgreeKey: null,
//         handleDisagreeKey: null,
//         agreeConfirmParams: null,
//         disagreeConfirmParams: null
//     }
// }

// const confirmModalSlice = createSlice({
//     name: 'confirmModalSlice',
//     initialState,
//     reducers: {
//         handleOpenConfirmModal: (state) => {
//             state.modalOpenState = true;
//         },
//         handleCloseConfirmModal: (state) => {
//             state.modalOpenState = false;
//         },
//         setConfirmTitle: (state, action) => {
//             state.title = action.payload.title;
//         },
//         setConfirmMessage: (state, action) => {
//             state.confirmMessage = action.payload.message;
//         },
//         setActionHandlers: (state, action) => {
//             state.handleAgree = action.payload.actionHandlers;
//         }
//     },
// })


// export const { handleOpenConfirmModal, handleCloseConfirmModal, setConfirmTitle, setConfirmMessage, setActionHandlers} = confirmModalSlice.actions
// export default confirmModalSlice.reducer