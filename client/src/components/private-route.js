import React from 'react'
import { useSelector } from 'react-redux'
import {Route, Redirect} from "react-router-dom"

const PrivateRoute = ({children,...props}) => {
    const isLogged = useSelector((state) => state.user.loggedIn)    
    return (
        <Route 
            {...props} 
            render={() => isLogged ? children :  <Redirect to='/login'/>} 
        />
    )
}

export default PrivateRoute