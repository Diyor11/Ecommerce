import {configureStore} from "@reduxjs/toolkit";
import product from "./productSlice";
import cart from "./cartSlice";
import profile from "./profleSlice";
import modal from './modalSlice'

const store = configureStore({
    reducer: {
        profile,
        product,
        cart,
        modal,
    }
});

export default store