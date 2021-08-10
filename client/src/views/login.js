import React from 'react'
import { FormControl, InputLabel, Input, FormGroup, Button } from '@material-ui/core';

const Login = (props) => {
    return(
        <div className='login'>
            <div className='header'>

            </div>
            <div>
                <div className='m-5 col-4'>
                    <h3>Login</h3>
                    <form>
                        <FormGroup>
                            <FormControl>
                                <InputLabel htmlFor="my-input">Email address</InputLabel>
                                <Input type='email'/>                                
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormControl>
                                <InputLabel htmlFor="my-input">Password</InputLabel>
                                <Input type='password'/>                        
                            </FormControl>
                        </FormGroup>                            
                        <FormGroup className='mt-5'>
                            <Button variant="contained" color="primary">
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