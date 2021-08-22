import React from 'react'
import { FormControl, InputLabel, TextField, FormGroup, Button, makeStyles } from '@material-ui/core';
import AuthApis from '../apis/authApis'
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {userloginsuccess} from '../reducers/userReducer'

const useStyles = makeStyles((theme) => ({
    labelRoot: {
        fontSize: '1.5rem',
    },
    resize: {
        fontSize: '1.5rem'
    }
}))

const Login = (props) => {
    const { register, handleSubmit } = useForm();
    const classes = useStyles()
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
        <div >        
            <div>
                <div className='m-5 col-4'>
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <FormControl>                            
                                <TextField
                                    {...register("phone")}                                     
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.labelRoot
                                        }
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },                                       
                                    }}                                
                                    required                                    
                                    label="Email address" />
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormControl>                                
                                <TextField
                                    {...register("password")}                                    
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.labelRoot
                                        }
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },                                       
                                    }}
                                    type='password'
                                    required                                    
                                    label="Password" />                                                        
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