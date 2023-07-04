import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { api } from '../../utils'

export const fetchBrands = createAsyncThunk('product/fetchBrands', async() => {
    return (await api('/brand/list'))?.data
})

export const updateWithList = createAsyncThunk('product/updtaeWithList', async(data) => {
    return await api({url: '/wishlist', method: 'post', data})
})

const initialState = {
    filters: {limit: 10, page: 1, order: 0, min: 1, max: 2600, rating: 3}, 
    diteils: {},
    brands: [],
}

const productSlide = createSlice({
    name: 'productsSlice',
    initialState,
    reducers: {
        setDiteils: (state, {payload}) => {
            state.diteils = {...state.diteils, ...payload}
        },
        setFilter: (state, {payload}) => {
            state.filters = {...state.filters, ...payload}
        },
        setBrands: (state, {payload}) => {
            state.brands = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchBrands.fulfilled, (state, {payload}) => {
            state.brands = payload
        })
        builder.addCase(fetchBrands.rejected, (state, {payload}) => {
            state.brands = []
        })
        builder.addCase(updateWithList.fulfilled, (state, {payload}) => {
            // state.products
        })
    }
})


export const { setDiteils, setFilter } = productSlide.actions
export default productSlide.reducer