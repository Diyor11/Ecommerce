import {createSlice} from '@reduxjs/toolkit'
import { CART_ITEMS, CART_TOTAL } from '../../constants'
import {setStorage} from '../../utils'

const calculatePrice = (products) => {
    return products.reduce((acc, current) => acc + current.price * current.quantity, 0)
}

const getInitialState = () => {
    const data = setStorage(CART_ITEMS)    
    if(data && data.length) {
        return ({
            products: data,
            totalPrice: calculatePrice(data)
        })
    } else return {products: [], totalPrice: 0}
}

const cartSlice = createSlice({
    name: 'products',
    initialState: getInitialState(),
    reducers: {
        addToCart: (state, {payload}) => {            
            const newProducts = [...state.products, payload]     
            const totalPrice = calculatePrice(newProducts)
            const savedData = setStorage(CART_ITEMS, newProducts)
            setStorage(CART_TOTAL, totalPrice)
            state.totalPrice = totalPrice
            if(savedData) {
                state.products = newProducts
            }
        },
        removeFromCart: (state, {payload: id}) => {
            const newProducts = state.products.filter(product => product._id !== id)
            const savedData = setStorage(CART_ITEMS, newProducts)
            const totalPrice = calculatePrice(newProducts)
            setStorage(CART_TOTAL, totalPrice)
            state.totalPrice = totalPrice
            if(savedData) {
                state.products = newProducts
            }
        },
        clearCart: (state) => {
            state.products = []
        }
    },
})


export const { addToCart, clearCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer