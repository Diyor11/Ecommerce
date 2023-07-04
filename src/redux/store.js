import {configureStore} from "@reduxjs/toolkit";
import product from "./productSlice";
import cart from "./cartSlice";
import profile from "./profleSlice";
import modal from './modalSlice'

const store = configureStore({
    reducer: {
        product,
        cart,
        profile,
        modal,
    }
});

export default store