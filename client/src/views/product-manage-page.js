import React, {useState} from 'react'
import {IconButton} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ProductEditModal from '../components/product-edit-modal'
import { IoIosSave } from "react-icons/io";
import { IoTrashBin, IoAddCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

var data = [
    {
        id: 'AO10',
        name: 'Nồi lẩu thập cẩm dùng năng lượng mặt trăng',
        img: 'https://massageishealthy.com/wp-content/uploads/2019/05/cach-nau-lau-thap-cam-hai-san-chua-cay-lau-thap-cam-gom-nhung-gi-7.jpg',
        category: 'Nồi niêu',
        status: 'Hot',
        store: true,
        price: 300000
    },
    {
        id: 'LOL11',
        name: 'Nồi lẩu thập cẩm dùng năng lượng mặt trăng',
        img: 'https://massageishealthy.com/wp-content/uploads/2019/05/cach-nau-lau-thap-cam-hai-san-chua-cay-lau-thap-cam-gom-nhung-gi-7.jpg',
        category: 'Nồi niêu',
        status: 'Dog',
        store: false,
        price: 300000
    },
    {
        id: 'LOL11',
        name: 'Nồi lẩu thập cẩm dùng năng lượng mặt trăng',
        img: 'https://massageishealthy.com/wp-content/uploads/2019/05/cach-nau-lau-thap-cam-hai-san-chua-cay-lau-thap-cam-gom-nhung-gi-7.jpg',
        category: 'Nồi niêu',
        status: 'Dog',
        store: false,
        price: 300000
    },

    {
        id: 'LOL11',
        name: 'Nồi lẩu thập cẩm dùng năng lượng mặt trăng',
        img: 'https://massageishealthy.com/wp-content/uploads/2019/05/cach-nau-lau-thap-cam-hai-san-chua-cay-lau-thap-cam-gom-nhung-gi-7.jpg',
        category: 'Nồi niêu',
        status: 'Dog',
        store: false,
        price: 300000
    },
    {
        id: 'LOL11',
        name: 'Nồi lẩu thập cẩm dùng năng lượng mặt trăng',
        img: 'https://massageishealthy.com/wp-content/uploads/2019/05/cach-nau-lau-thap-cam-hai-san-chua-cay-lau-thap-cam-gom-nhung-gi-7.jpg',
        category: 'Nồi niêu',
        status: 'Dog',
        store: false,
        price: 300000
    },
    {
        id: 'LOL11',
        name: 'Nồi lẩu thập cẩm dùng năng lượng mặt trăng',
        img: 'https://massageishealthy.com/wp-content/uploads/2019/05/cach-nau-lau-thap-cam-hai-san-chua-cay-lau-thap-cam-gom-nhung-gi-7.jpg',
        category: 'Nồi niêu',
        status: 'Dog',
        store: false,
        price: 300000
    },
    {
        id: 'LOL11',
        name: 'Nồi lẩu thập cẩm dùng năng lượng mặt trăng',
        img: 'https://massageishealthy.com/wp-content/uploads/2019/05/cach-nau-lau-thap-cam-hai-san-chua-cay-lau-thap-cam-gom-nhung-gi-7.jpg',
        category: 'Nồi niêu',
        status: 'Dog',
        store: false,
        price: 300000
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

const ProductManagePage = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return(
        <div className='production-page'>
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
                    <ProductEditModal></ProductEditModal>
                </div>
                </Fade>
            </Modal>
            <h4>Sản phẩm</h4>        
                <div className='row m-0 title'>
                    <div className='col-1 text-center'>
                        ID
                    </div>
                    <div className='col-2 text-center'>
                        Sản phẩm
                    </div>
                    <div className='col-2 text-center'>
                        Ảnh
                    </div>
                    <div className='col-2 text-center'>
                        Danh mục
                    </div>
                    <div className='col-1 text-center'>
                        Giá
                    </div>
                    <div className='col-1 text-center'>
                        Trạng thái
                    </div>
                    <div className='col-1 text-center'>
                        Lưu kho
                    </div>
                    <div className='col-2 text-center'>
                        Tùy chọn
                    </div>
                </div>
                <div className='product-list'>
                    {
                        data.map((item, index) => 
                        <div className='row m-0 product-row' style={{background: `${(index%2===0)?'#ebebeb':''}`}} key={item.id}>
                            <div className='col-1 product-item'>
                                {item.id}
                            </div>
                            <div className='col-2 product-item'>
                                {item.name}
                            </div>
                            <div className='col-2 product-item'>
                                <img src={item.img} alt=''></img>
                            </div>
                            <div className='col-2 product-item'>
                                {item.category}
                            </div>
                            <div className='col-1 product-item'>
                                {item.price}
                            </div>
                            <div className='col-1 product-item'>
                                {
                                    item.status
                                }
                            </div>
                            <div className='col-1 product-item'>
                            {
                                    (item.store)?(
                                        <div className='green-dot'></div>
                                    ):(
                                        <div className='red-dot'></div>
                                    )
                                }
                            </div>
                            <div className='col-2 product-item'>
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

export default ProductManagePage