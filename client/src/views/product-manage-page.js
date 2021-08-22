import React, {useState, useEffect} from 'react'
import { IconButton, InputAdornment, InputLabel, Input, Button, Select, MenuItem } from '@material-ui/core'
import {Skeleton} from '@material-ui/lab'
import { IoTrashBin, IoAddCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdBrokenImage } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import ConfirmModal from "../components/confirm-modal"

import Pagination from '@material-ui/lab/Pagination';
import AdminApi from '../apis/adminApis'
import ReactBnbGallery from 'react-bnb-gallery';
import LinearProgress from '@material-ui/core/LinearProgress';
import ProductModal from '../components/product-modal'
import alert from '../utils/alert';

const ProductManagePage = () => {    
    const [loading, setLoader] = useState(true)
    const [open, setOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [photoData, setPhotoData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [productList, setProductList] = useState([])
    const [deleteItem, setDeleteItem] = useState()

    const [searchProductInput, setSearchProductInput] = useState()
    const [categoryList, setCategoryList] = useState([{_id: 'n/a', name: 'Tất cả'}])
    const [category, setCategory] = useState('n/a')

    const [searchTemplate, setSearchTemplate] = useState({product: '', categoryId: 'n/a'})

    const [editProductObj, setEditProductObj] = useState()
    const [modalTitle, setModalTitle] = useState()    

    useEffect(() => {
        getProductList(1)
        getCategory()
    }, [])

    const getCategory = async () => {
        try {
            const res = await AdminApi.getCategoryList()
            if(res.status === 200) {
                setCategoryList(categoryList.concat(res.data))
            }
        } catch(e) {
            console.log(e)
        }
    }

    const getProductList = async (page) => {        
        try{
            setLoader(true)
            const res = await AdminApi.getProductList(page);            
            if(res.status === 200) {
                setProductList(res.data.product)                
                setTotalPage(res.data.total_page)            
            }            
        }
        catch(e) {
            console.log(e)
        }
        setLoader(false)
    }

    const handleOpenEditModal = (item) => {
        setModalTitle('Edit product')
        setEditProductObj(item)
        setOpen(true)        
    };

    const formatCurrency = (price) => {
        return price.toLocaleString('it-IT');                
    }    

    const handleOpenAddModal = () => {
        setModalTitle('Add product')
        setEditProductObj(null)
        setOpen(true)        
    }

    const handleCloseModal = () => {
        checkEditObject()
        setOpen(false)
    }

    const handleCloseModalAfterSave = () => {
        setPage(1)
        getProductList(1);
        checkEditObject()
        setOpen(false)
    }

    const checkEditObject = () => {
        if(editProductObj) {
            setEditProductObj(null)
        }
    }

    const openWidePhoto = (photo) => {
        let array = []
        photo.forEach((item) => {array.push(item.url)})
        setIsOpen(true)
        setPhotoData(array)
    }

    const handleDelete = async (id) => {
        try {       
            const res = await AdminApi.deleteProduct(id);            
            if(res.status === 200) {
                alert({icon: 'success', title: res.message, msg: 'Xóa sản phẩm thành công'})
                setPage(1)                
                getProductList(1)              
            }
        }
        catch(e) {
            console.log(e)
        }
        handleCloseConfirmModal()   
    }

    const pageChange = (event, page) => {
        setPage(page)
        if (searchTemplate.product || searchTemplate.categoryId !== 'n/a') {            
            handleSearch(page)
            return;
        }
        getProductList(page)
    }

    const checkSearchInputDoExist = async (page) => {        
        try {
            if (searchProductInput) {
                if(category !== 'n/a') {
                    return await AdminApi.searchProductByCategoryAndProduct(page, category, searchProductInput)
                }
                return await AdminApi.searchProductByProduct(page, searchProductInput)
            }
            if (category !== 'n/a') {
                return await AdminApi.searchProductByCategory(page, category)
            }
            return await AdminApi.getProductList(page)
        }
        catch(e) {
            console.log(e)
        }
    }

    const handleSearch = async (page) => {
        setPage(page)        
        try {
            setLoader(true)
            const res = await checkSearchInputDoExist(page, category, searchProductInput)
            if (res.status === 200) {
                formatCurrency(res.data.product)
                setTotalPage(res.data.total_page)
                setSearchTemplate({product: searchProductInput, categoryId: category})                            
            }
            if(res.status === 201) {
                alert({icon: 'error', title: 'Không tìm thấy sản phẩm', msg: res.message})
            }
        }
        catch(e) {
            console.log(e)
        }
        setLoader(false)
    }

    const handleCloseConfirmModal = () => {
        setOpenConfirmModal(false)
    }

    const handleOpenConfirmModal = (product) => {
        setDeleteItem(product)
        setOpenConfirmModal(true)
    }

    const handleAcceptConfirmModal = () => {
        handleDelete(deleteItem._id)
    }

    return(
        <div className='production-page'>
            <ConfirmModal open={openConfirmModal} handleClose={handleCloseConfirmModal} unaccept={handleCloseConfirmModal} accept={handleAcceptConfirmModal}></ConfirmModal>
            <IconButton className='float-button' color="primary" onClick={handleOpenAddModal}>
                <IoAddCircle color='#0C9' size='60px'></IoAddCircle>
            </IconButton>
            <ReactBnbGallery
                opacity={0.8}
                show={isOpen}
                photos={photoData}
                onClose={() => setIsOpen(false)}
            />
            <ProductModal title={modalTitle} modalEditFilter={editProductObj} reloadNewData={handleCloseModalAfterSave} handleCloseModal={handleCloseModal} open={open} categoryList={categoryList}></ProductModal>                
            <h4>Sản phẩm</h4>
            <div className='row search-section'>
                <div className='col-3'>
                    <InputLabel htmlFor="input-with-icon-adornment"><h6>Tìm kiếm theo sản phẩm</h6></InputLabel>
                    <Input
                    id="input-with-icon-adornment"
                    className='searchInput'
                    value={searchProductInput}
                    onChange={(e) => {
                        setSearchProductInput(e.target.value)
                    }}
                    startAdornment={
                        <InputAdornment position="start">
                            <BiSearch size={18}/>
                        </InputAdornment>
                    }
                    />
                </div>
                <div className='col-3'>
                    <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className='category-select-box'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        >
                        {
                            categoryList.map((item, index) => (
                                <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                            ))
                        }                        
                    </Select>
                </div>
                <div className='col-3'>
                    <Button className='btn' variant="contained" color="primary" onClick={() => handleSearch(1)}>
                        Tìm kiếm
                    </Button>
                </div>
            </div>           
            <div>
            </div>      
                <div className='row m-0 title'>
                    <div className='col-1 text-center'>
                        ID
                    </div>
                    <div className='col-2 text-center'>
                        Sản phẩm
                    </div>
                    <div className='col-1 text-center'>
                        Ảnh
                    </div>
                    <div className='col-2 text-center'>
                        Danh mục
                    </div>
                    <div className='col-2 text-center'>
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
                        (loading)?(
                            <div>
                                <LinearProgress></LinearProgress>
                                <Skeleton animation="wave" height={80}/>
                                <Skeleton animation="wave" height={80}/>
                                <Skeleton animation="wave" height={80}/>                                                                
                            </div>                                         
                        ): (
                            <>
                                {
                                    productList && productList.map((item, index) => 
                                    <div className='row m-0 product-row' style={{background: `${(index%2===0)?'#ebebeb':''}`}} key={item._id}>
                                        <div className='col-1 product-item'>
                                            {(page - 1)*10 + index + 1}
                                        </div>
                                        <div className='col-2 product-item'>
                                            {item.name}
                                        </div>
                                        <div className='col-1 product-item'>
                                            {
                                                (item.image[0])?(
                                                    <div className='img-wrapper' onClick={() => openWidePhoto(item.image)}>
                                                        <img src={item.image[0].url} alt=''></img>
                                                    </div>   
                                                ):(
                                                    <div className='img-broke-wrapper'>
                                                        <MdBrokenImage className='mt-3' size='22px' color='white'></MdBrokenImage>
                                                    </div>
                                                )
                                            }
                                                                        
                                        </div>
                                        <div className='col-2 product-item'>
                                            {item.category.name}
                                        </div>
                                        <div className='col-2 product-item'>
                                            {formatCurrency(item.price)} VND
                                        </div>
                                        <div className='col-1 product-item'>
                                            {
                                                item.sale_tag > 0?`${item.status} (-${item.sale_tag}%)`: item.status
                                            }
                                        </div>
                                        <div className='col-1 product-item'>
                                        {
                                                (item.available)?(
                                                    <div className='green-dot'></div>
                                                ):(
                                                    <div className='red-dot'></div>
                                                )
                                            }
                                        </div>
                                        <div className='col-2 product-item'>
                                            <IconButton color="primary" onClick={() => handleOpenEditModal(item)}>
                                                <FaEdit size='20px'></FaEdit>
                                            </IconButton>
                                            <IconButton className='text-danger' color="secondary" aria-label="delete" onClick={() => handleOpenConfirmModal(item)}>
                                                <IoTrashBin size='20px'></IoTrashBin>
                                            </IconButton>
                                        </div>
                                    </div>)
                                }
                            </>
                        )
                    }
                    
                </div> 
                <div className='mt-4 paging'>
                    <Pagination count={totalPage} page={page} onChange={pageChange} variant="outlined" shape="rounded" />
                </div>          
        </div>
    )
}

export default ProductManagePage