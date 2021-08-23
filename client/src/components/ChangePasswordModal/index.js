import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField, FormGroup, FormHelperText } from '@material-ui/core'
import AdminApi from '../../apis/adminApis'
import alert from '../../utils/alert'

const ChangePasswordModal = (props) => {
    const classes = useStyles();    
    const [password,setPassword] = useState()
    const [repassword,setRePassword] = useState()
    const [warning, setWarning] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        if(password !== repassword) {
            setWarning(true)
            return
        }

        const data = {
            "password": password
        }        
        try {
            const res = await AdminApi.adminChangeManagerPassword(props.accountId, data)

            if(res.status === 200) {
                alert({icon:'success', title: res.message, msg: 'Đổi mật khẩu thành công'})
                props.closeAfterSave()
            }
        }
        catch(e) {
            console.log(e)
        }
        closeModal()
    }

    const closeModal = () => {
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
                        <h4>Đổi mật khẩu quản lý</h4>
                        <form onSubmit={onSubmit}>
                        <FormGroup className={classes.FormGroup}>
                                <TextField                                        
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.resize
                                        }
                                    }}
                                    value={password}
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}                                        
                                    InputProps={{
                                        classes: {
                                          input: classes.resize,
                                        },
                                    }}
                                    required
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
                                    type='password'                            
                                    InputProps={{
                                        classes: {
                                          input: classes.resize,
                                        },
                                    }}
                                    required
                                    label="Nhập lại mật khẩu"/>
                                    <FormHelperText id="component-error-text"><h6 className={warning?'text-danger':''}>Hãy chắc chắn rằng giống mật khẩu</h6></FormHelperText>
                            </FormGroup>
                            <div className='row mt-5'>
                            <div className='col-6 text-center'>
                                <Button variant="contained" type='button' color="secondary" onClick={closeModal} style={{fontSize: '1.2rem'}}>
                                    Trở lại
                                </Button>
                            </div>
                            <div className='col-6 text-center'>
                                <Button variant="contained" type='submit' color="primary" style={{fontSize: '1.2rem'}}>
                                    Đồng ý
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

export default ChangePasswordModal