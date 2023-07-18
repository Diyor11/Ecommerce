import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate} from 'react-router-dom'

export default function Redirect({isPrivate, children}) {
    
    const authenticated = useSelector(state => state.profile.authenticated)    


    if(isPrivate) {
        return authenticated ? {...children}:<Navigate to='/login' />
    } else {
        return authenticated ? <Navigate to='/dashboard' />:{...children}
    }
}