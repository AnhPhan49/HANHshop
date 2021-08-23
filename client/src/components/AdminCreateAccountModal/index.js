import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, FormGroup} from '@material-ui/core'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const AdminCreateAccountModal = (props) => {
    const classes = useStyles();
    const [submitButtonState, setSubmitButtonState] = useState(true)
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')

    const submitHandle = (e) => {
        e.preventDefault()
        if(password !== repassword) {

        }
    }

    return(
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            closeAfterTransition
            className={classes.modal}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <form onSubmit={submitHandle}>
                            <FormGroup className={classes.FormGroup}>
                                <TextField                                        
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.resize
                                        }
                                    }}
                                    value={firstname}
                                    onChange={(e) => setFirstName(e.target.value)}                                        
                                    InputProps={{
                                        classes: {
                                          input: classes.resize,
                                        },
                                    }}
                                    required
                                    label="Họ"/>
                            </FormGroup>
                            <FormGroup className={classes.FormGroup}>
                                <TextField                                        
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.resize
                                        }
                                    }}
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)}                                        
                                    InputProps={{
                                        classes: {
                                          input: classes.resize,
                                        },
                                    }}
                                    required
                                    label="Tên"/>
                            </FormGroup>
                            <FormGroup className={classes.FormGroup}>
                                <TextField                                        
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.resize
                                        }
                                    }}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}                                        
                                    InputProps={{
                                        classes: {
                                          input: classes.resize,
                                        },
                                    }}
                                    type='phone'
                                    required
                                    label="Số điện thoại"/>
                            </FormGroup>
                            <FormGroup className={classes.FormGroup}>
                                <TextField                                        
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.resize
                                        }
                                    }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}                                        
                                    InputProps={{
                                        classes: {
                                          input: classes.resize,
                                        },
                                    }}
                                    required
                                    type='password'
                                    label="Mật khẩu"/>
                                </FormGroup>
                                    <FormGroup className={classes.FormGroup}>
                                        <TextField                                        
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.resize
                                                }
                                            }}
                                            value={repassword}
                                            onChange={(e) => setRePassword(e.target.value)}                                        
                                            InputProps={{
                                                classes: {
                                                input: classes.resize,
                                                },
                                            }}
                                            type='password'
                                            required
                                            label="Nhập lại mật khẩu"/>
                                    </FormGroup>
                            <div className='mt-3 row modal-action'>
                                    <div className='col-6'>
                                        <Button type='button' onClick={props.handleCloseModal} variant="contained" color="secondary" style={{fontSize: '1.2rem'}}>
                                            Thoát
                                        </Button>
                                    </div>
                                    <div className='col-6'>
                                        <Button disabled={submitButtonState} type='submit' variant="contained" color="primary"  style={{fontSize: '1.2rem'}}>
                                            Lưu
                                        </Button>
                                    </div>                                                                      
                            </div>
                        </form>                        
                    </div>                    
                </Fade>            
        </Modal>
    )
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,      
      borderRadius: 10,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    resize: {
        fontSize: '1.5rem',
    },
}));

export default AdminCreateAccountModal