import React from 'react'
import { FormControl, InputLabel, Input, FormGroup, Button } from '@material-ui/core';
import AuthApis from '../apis/authApis'
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {userloginsuccess} from '../reducers/userReducer'

const Login = (props) => {
    const { register, handleSubmit } = useForm();
    const history = useHistory()
    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        try{
            const res = await AuthApis.login(data);                  
            if(res.status === 200) {                
                localStorage.setItem("token", res.data)
                AuthApis.setHeaderAxios(res.data)
                dispatch(userloginsuccess())
                history.push('/admin')
            }
        }
        catch(e) {
            console.log(e)
        }
    }

    return(
        <div className='login'>
            <div className='header'>
            </div>
            <div>
                <div className='m-5 col-4'>
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <FormControl>
                                <InputLabel htmlFor="my-input" required>Email address</InputLabel>
                                <Input {...register("email")} type='email'/>                                
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormControl>
                                <InputLabel htmlFor="my-input" required>Password</InputLabel>
                                <Input {...register("password")} type='password'/>                        
                            </FormControl>
                        </FormGroup>                            
                        <FormGroup className='mt-5'>
                            <Button variant="contained" color="primary" type='submit'>
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </div>                
            </div>
        </div>
    )
}

export default Login