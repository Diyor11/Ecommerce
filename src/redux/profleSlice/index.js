import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { setToken, api } from '../../utils'
import { toast } from 'react-toastify'
export const fetchProfile = createAsyncThunk('profile/fetchProfile', async() => {    

    try {
        const res = await api('/user/me')
        return res.data
    } catch (error) {                
        if(error.response) {
            throw new Error(error.response.data?.message || error.messsage || 'Something went wrong')
        } else {
            toast('Network error', {type: 'error'})
            return {user: null}
        }
    }
})

const tokenValid = localStorage.getItem('token') ? true:false
const initialState = {user: null, authenticated: tokenValid,  isLoading: false}

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
        loginUser: (state, {payload}) => {   
            const token = payload.token
            
            if(token) {
                setToken(token)
                state.authenticated = true
            } else {
                setToken(null)
            }
        },
        logOut: (state) => {
            state.authenticated = false
            state.user = null
            setToken(null)
        },
        updateUser: (state, {payload}) => {
            state.user = {...state.user, ...payload}
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProfile.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchProfile.fulfilled, (state, {payload}) => {
            if(payload.user)
                state.user = payload.user
            state.isLoading = false
            
        })
        builder.addCase(fetchProfile.rejected, (state, action) => {
            setToken(null)
            state.user = null
            state.authenticated = false
            state.isLoading = false
        })
    }
})

export const {logOut, loginUser, updateUser} = profileSlice.actions
export default profileSlice.reducer