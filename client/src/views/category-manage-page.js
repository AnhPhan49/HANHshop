import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import { IoIosSave } from "react-icons/io";
import { IoTrashBin, IoAddCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

import CategoryEditModal from '../components/category-edit-modal'

var data = [
    {
        name: 'Áo quần',
        create: '08/08/2021',
        status: true,
        id: 1
    },
    {
        name: 'Đồ gia dụng',
        create: '06/27/2021',
        status: false,
        id: 2
    },
    {
        name: 'Đồ gia dụng',
        create: '06/27/2021',
        status: false,
        id: 2
    },
    {
        name: 'Đồ gia dụng',
        create: '06/27/2021',
        status: false,
        id: 2
    },
    {
        name: 'Đồ gia dụng',
        create: '06/27/2021',
        status: false,
        id: 2
    },
    {
        name: 'Đồ gia dụng',
        create: '06/27/2021',
        status: false,
        id: 2
    },
    {
        name: 'Đồ gia dụng',
        create: '06/27/2021',
        status: false,
        id: 2
    },
    {
        name: 'Đồ gia dụng',
        create: '06/27/2021',
        status: false,
        id: 2
    },
    {
        name: 'Đồ gia dụng',
        create: '06/27/2021',
        status: false,
        id: 2
    },
    {
        name: 'Đồ gia dụng',
        create: '06/27/2021',
        status: false,
        id: 2
    },
    
]

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',      
    },
    paper: {
      backgroundColor: theme.palette.background.paper,      
      boxShadow: theme.shadows[5],
      padding: theme.spacing(5, 5, 5),
      borderRadius:'10px'
    },
  }));

const CategoryManagePage = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  

    return(
        <div className='category-page'>
            <IconButton className='float-button' color="primary" onClick={handleOpen}>
                <IoAddCircle color='#0C9' size='60px'></IoAddCircle>
            </IconButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <CategoryEditModal></CategoryEditModal>
                </div>
                </Fade>
            </Modal>
            <h4>Danh mục</h4>
            <div className='row m-0 title'>
                <div className='col-1 text-center'>
                    STT
                </div>
                <div className='col-3 text-center'>
                    Danh mục
                </div>
                <div className='col-3 text-center'>
                    Ngày tạo
                </div>
                <div className='col-2 text-center'>
                    Trạng thái
                </div>
                <div className='col-3 text-center'>
                    Tùy chọn
                </div>
            </div>
            <div className='category-list'>
            {
                data.map((item, index) => 
                <div className='row m-0 category-row' style={{background: `${(index%2===0)?'#ebebeb':''}`}} key={item.id}>
                    <div className='col-1 category-item text-center'>
                        {index + 1}
                    </div>
                    <div className='col-3 category-item text-center'>
                        {item.name}
                    </div>
                    <div className='col-3 category-item text-center'>
                        {item.create}
                    </div>
                    <div className='col-2 category-item text-center'>
                        {
                            (item.status)?(
                                <div className='green-dot'></div>
                            ):(
                                <div className='red-dot'></div>
                            )
                        }
                    </div>
                    <div className='col-3 category-item'>
                        <IconButton color="primary" onClick={handleOpen}>
                            <FaEdit size='20px'></FaEdit>
                        </IconButton>
                        <IconButton className='text-danger' color="secondary" aria-label="delete">
                            <IoTrashBin size='20px'></IoTrashBin>
                        </IconButton>
                    </div>
                </div>)
            }
            </div>      
        </div>
    )
}

export default CategoryManagePage