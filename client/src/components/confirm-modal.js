import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const ConfirmModal = (props) => {
    const classes = useStyles();

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
                        <h4>Bạn có chắc thực hiện thao tác này? <span className='text-danger'>Sẽ không thể hoàn tác sau khi thực hiện</span></h4>
                        <div className='row mt-5'>
                            <div className='col-6 text-center'>
                                <Button variant="contained" color="secondary" onClick={props.handleClose} style={{fontSize: '1.2rem'}}>
                                    Trở lại
                                </Button>
                            </div>
                            <div className='col-6 text-center'>
                                <Button variant="contained" color="primary" onClick={props.accept} style={{fontSize: '1.2rem'}}>
                                    Đồng ý
                                </Button>
                            </div>
                        </div>
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
}));

export default ConfirmModal