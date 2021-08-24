import React from 'react'
import { useSelector } from 'react-redux'
import {Route, Redirect} from "react-router-dom"

const PrivateRoute = ({children,...props}) => {
    const isLogged = useSelector((state) => state.user.loggedIn)
    const user = useSelector((state) => state.user.user)  
    return (
        <Route 
            {...props} 
            render={() => isLogged && (user.role === 'admin' || user.role === 'manager') ? children :  <Redirect to='/login'/>} 
        />
    )
}

export default PrivateRoute