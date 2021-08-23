import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import { IoAddCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import LinearProgress from '@material-ui/core/LinearProgress';

import AdminApi from '../apis/adminApis'
import CategoryEditModal from '../components/CategoryManagementModal/category-modal'

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
    const [loading, setLoader] = useState(true)
    const [catelist, setCateList] = useState([])
    const [modalTitle, setModalTitle] = useState()
    const [editCateObj, setEditCateObj] = useState()   

    useEffect(() => {        
        fetchCateList()
    }, [])

    async function fetchCateList() {
        try{
            setLoader(true)
            const res = await AdminApi.getCategoryList();
            if(res.status === 200) {                                
                setCateList(res.data)
                setLoader(false)
            }
        }
        catch(e) {
            console.log(e)
        }            
    }

    const handleEditOpen = (item) => {
        setModalTitle('Edit category')
        setEditCateObj(item)
        setOpen(true);
    };

    const handleAddOpen = (item) => {
        setModalTitle('Add category');
        setEditCateObj(null);
        setOpen(true);
    }
    const handleSaveClose = () => {
        setOpen(false);
        fetchCateList();
    }
    const handleClose = () => {
        setOpen(false);
    };

    const convertTime = (unformatTime) => {        
        let date = new Date(unformatTime)
        const formatedTime = date.getDate() + " / " + (date.getMonth() + 1) + " / " + date.getFullYear();                    
        return formatedTime
    }

    return(
        <div className='category-page'>            
            <IconButton className='float-button' color="primary" onClick={handleAddOpen}>
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
                    <CategoryEditModal title={modalTitle} modalEditFilter={editCateObj} closeModalHandler={handleSaveClose}></CategoryEditModal>
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
                            (loading)?(
                                <LinearProgress></LinearProgress>
                            ): (
                                <></>
                            )
                        }
                    {
                        catelist && catelist.map((item, index) => 
                        <div className='row m-0 category-row' style={{background: `${(index%2===0)?'#ebebeb':''}`}} key={item._id}>
                            <div className='col-1 category-item text-center'>
                                {index + 1}
                            </div>
                            <div className='col-3 category-item text-center'>
                                {item.name}
                            </div>
                            <div className='col-3 category-item text-center'>                                
                                {
                                    convertTime(item.createdAt)
                                }                    
                            </div>
                            <div className='col-2 category-item text-center'>
                                {
                                    (item.active)?(
                                        <div className='green-dot'></div>
                                    ):(
                                        <div className='red-dot'></div>
                                    )
                                }
                            </div>
                            <div className='col-3 category-item'>
                                <IconButton color="primary" onClick={() => handleEditOpen(item)}>
                                    <FaEdit size='20px'></FaEdit>
                                </IconButton>
                            </div>
                        </div>)
                    }
                </div>
                  
        </div>
    )
}

export default CategoryManagePage