import React, {useState, useEffect, useRef} from 'react'
import {IconButton} from '@material-ui/core'
import { IoTrashBin, IoAddCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdBrokenImage } from "react-icons/md";

import Pagination from '@material-ui/lab/Pagination';
import AdminApi from '../apis/adminApis'
import ReactBnbGallery from 'react-bnb-gallery';
import LinearProgress from '@material-ui/core/LinearProgress';
import ProductModal from '../components/product-modal'

const ProductManagePage = (props) => {
    const childRef = useRef();  
    const [loading, setLoader] = useState(true)    
    const [isOpen, setIsOpen] = useState(false)
    const [photoData, setPhotoData] = useState([])   
    const [totalPage, setTotalPage] = useState(1)       
    const [productList, setProductList] = useState([])

    const [editProductObj, setEditProductObj] = useState()
    const [modalTitle, setModalTitle] = useState()    

    useEffect(() => {
        getProductList(1)
    }, [])

    const getProductList = async (page) => {
        try{
            setLoader(true)
            const res = await AdminApi.getProductList(page);
            if(res.status === 200) {                
                formatCurrency(res.data.product)                 
                setTotalPage(res.data.total_page)
                setLoader(false)
            }
        }
        catch(e) {
            console.log(e)
        }
    }

    const handleOpenEditModal = (item) => {
        setModalTitle('Edit product')
        setEditProductObj(item)
        childRef.current.handleOpenModal()
    };

    const formatCurrency = (data) => {
        data.forEach((item, index) => {
            data[index].price = item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        })
        setProductList(data) 
    }

    const pageChange = (event, page) => {
        getProductList(page)
    }

    const handleOpenAddModal = () => {
        setModalTitle('Add product')
        setEditProductObj('')
        childRef.current.handleOpenModal()
    }

    const handleCloseModalAfterSave = () => {        
        getProductList();
    }

    const openWidePhoto = (photo) => {
        let array = []
        photo.forEach((item) => {array.push(item.url)})
        setIsOpen(true)
        setPhotoData(array)
    }

    return(
        <div className='production-page'>
            <IconButton className='float-button' color="primary" onClick={handleOpenAddModal}>
                <IoAddCircle color='#0C9' size='60px'></IoAddCircle>
            </IconButton>
            <ReactBnbGallery
                opacity={0.8}
                show={isOpen}
                photos={photoData}
                onClose={() => setIsOpen(false)}
            />
            <ProductModal ref={childRef} title={modalTitle} modalEditFilter={editProductObj} reloadNewData={handleCloseModalAfterSave}></ProductModal>                
            <h4>Sản phẩm</h4>        
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
                            <LinearProgress></LinearProgress>
                        ): (
                            <></>
                        )
                    }
                    {
                        productList.map((item, index) => 
                        <div className='row m-0 product-row' style={{background: `${(index%2===0)?'#ebebeb':''}`}} key={item._id}>
                            <div className='col-1 product-item'>
                                {index + 1}
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
                                {item.price}
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
                                <IconButton className='text-danger' color="secondary" aria-label="delete">
                                    <IoTrashBin size='20px'></IoTrashBin>
                                </IconButton>
                            </div>
                        </div>)
                    }
                </div> 
                <div className='mt-4 paging'>
                    <Pagination count={totalPage} onChange={pageChange} variant="outlined" shape="rounded" />
                </div>          
        </div>
    )
}

export default ProductManagePage