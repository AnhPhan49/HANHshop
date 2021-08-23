import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, FormGroup, FormHelperText } from '@material-ui/core'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AdminApi from '../../apis/adminApis'
import alert from '../../utils/alert'

const AdminCreateAccountModal = (props) => {
    const classes = useStyles();
    const [submitButtonState, setSubmitButtonState] = useState(false)
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const [warning, setWarning] = useState(false)

    const submitHandle = async (e) => {
        e.preventDefault()
        if(password !== repassword) {
            setWarning(true)
            return
        }
        const data = {
            "firstname": firstname,
            "lastname": lastname,
            "phone": phone,
            "password": repassword
        }
        try {
            setSubmitButtonState(true)
            const res = await AdminApi.createManagerAccount(data);
            if(res.status === 200) {
                alert({icon:'success', title: res.message, msg: 'Tạo tài khoản thành công'})
                props.closeAfterSave()
            }
        }
        catch(e) {
            console.log(e)
        }        
        setSubmitButtonState(false)
        closeModal()
    }

    const closeModal = () => {
        setFirstName()
        setLastName()
        setPhone()
        setPassword()
        setRePassword()
        setWarning(false)
        props.handleClose()
    }


    return(
        <Modal
            open={props.open}
            onClose={closeModal}
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
                        <h4>Tạo tài khoản quản lý</h4>
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
                                            <FormHelperText id="component-error-text"><h6 className={warning?'text-danger':''}>Hãy chắc chắn rằng giống mật khẩu</h6></FormHelperText>
                                    </FormGroup>
                            <div className='mt-3 row modal-action'>
                                    <div className='col-6'>
                                        <Button type='button' onClick={closeModal} variant="contained" color="secondary" style={{fontSize: '1.2rem'}}>
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