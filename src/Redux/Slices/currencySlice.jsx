import { createSlice } from '@reduxjs/toolkit'

// Initial State
const initialState = {
    currency: "$"
}

const currencySlice = createSlice({
    name: 'currencySlice',
    initialState,
    reducers: {
        changeCurrency: (state, action) => {
            state.currency = action.payload.currency;
        },
    },
})


export const { changeCurrency } = currencySlice.actions
export default currencySlice.reducer