import {createSlice} from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'madal',
    initialState: {cartOpen: false},
    reducers: {
        toggleCart: (state, {payload}) => {
            state.cartOpen = payload ?? !state.cartOpen
        }
    }
})

export const { toggleCart } = modalSlice.actions
export default modalSlice.reducer