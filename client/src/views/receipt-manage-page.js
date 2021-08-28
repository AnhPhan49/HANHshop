import React, {useState, useEffect, useRef} from 'react'
import {Button, IconButton} from '@material-ui/core'


import Pagination from '@material-ui/lab/Pagination';
import AdminApi from '../apis/adminApis'
import ReactBnbGallery from 'react-bnb-gallery';
import LinearProgress from '@material-ui/core/LinearProgress';
import ConfirmModal from "../components/confirm-modal"
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import alert from '../utils/alert';
const ReceiptManagePage= (props) => {
    const childRef = useRef();  
    const [loading, setLoader] = useState(true)    
    const [isOpen, setIsOpen] = useState(false)
    const [status,setStatus]=useState(false)
    const [allStatus,settAllStatus]=useState(false)
    const [photoData, setPhotoData] = useState([])   
    const [totalPage, setTotalPage] = useState(1)       
    const [inventoryList, setInventoryList] = useState([])
     
    const [openConfirmModal, setOpenConfirmModal] = useState(false)  
    const [page,setPage]=useState(1)
    const [pageDetail,setPageDetail]=useState()
    const [btnState, setBtnState] = useState(false)
    const [deleteItem, setDeleteItem] = useState()
    useEffect(() => {
        getReceiptList(1)
    }, [])

    const getReceiptList = async (page) => {
        try{
            setLoader(true)
            const res = await AdminApi.getReceiptList(page);
            console.log(res)
            setPageDetail(res.data.page)
            // console.log(res.data.page);
            if(res.status === 200) {      
                  
                formatCurrency(res.data.receipts)                 
                setTotalPage(res.data.total_page)
                
            }
        }
        catch(e) {
            console.log(e)
        }
        setLoader(false)
    }
    const handleDelete = async (id) => {
        try {
            setBtnState(true)
            const res = await AdminApi.cancelReceipt(id);            
            if(res.status === 200) {
                console.log(res)
                alert({icon: 'success', title: res.message, msg: 'Xóa sản phẩm thành công'})                              
                getReceiptList(page)              
            }
        }
        catch(e) {
            console.log(e)
        }
        setBtnState(false)
        handleCloseConfirmModal()   
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
        // console.log(deleteItem._id)
    }

    const formatCurrency = (data) => {
        console.log(data)
        // data.forEach((item, index) => {
        //     // if(item.total<=0){
        //     //     console.log("ok");
        //     // }
            
        //     data[index].product.price = item.product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        // })
        console.log(data)
        setInventoryList(data)
    }

    const pageChange = (event, page) => {
        getReceiptList(page)
        setPage(page)
    }


    const convertTime = (unformatTime) => {        
        let date = new Date(unformatTime)
        const formatedTime = date.getDate() + " / " + (date.getMonth() + 1) + " / " + date.getFullYear();                    
        return formatedTime
    }

// console.log(inventoryList);
    return(
        <div className='production-page'>
            <ConfirmModal open={openConfirmModal} handleClose={handleCloseConfirmModal} unaccept={handleCloseConfirmModal} accept={handleAcceptConfirmModal} buttonState={btnState}></ConfirmModal>
            <ReactBnbGallery
                opacity={0.8}
                show={isOpen}
                photos={photoData}
                onClose={() => setIsOpen(false)}
            />
            {/* <InventoryModal all={allStatus} ref={childRef} status={status} title={modalTitle}  page={pageDetail} modalEditFilter={editObj} reloadNewData={handleCloseModalAfterSave}></InventoryModal>                 */}
            <h4>Đơn Hàng</h4>        
                <div className='row m-0 title'>
                    <div className='col-1 text-center'>
                        ID
                    </div>
                    <div className='col-1 text-center'>
                        Tên
                    </div>
                    <div className='col-1 text-center'>
                        Điện Thoại
                    </div>
                    <div className='col-2 text-center'>
                        Địa chỉ
                    </div>
                    <div className='col-2 text-center'>
                        Ngày Đặt
                    </div>      
                    <div className='col-1 text-center'>
                        Tổng Tiền
                    </div> 
                    <div className='col-1 text-center'>
                        Mã Đơn
                    </div>              
                    <div className='col-2 text-center'>
                        Tình Trạng
                    </div>
                    <div className='col-1 text-center'>
                        Tùy Chọn
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
                        inventoryList && inventoryList.map((item, index) => 
                        <div className='row m-0 product-row' style={{background: `${(index%2===0)?'#ebebeb':''}`}} key={item._id}>
                            <div className='col-1 product-item'>
                            {(pageDetail - 1)*10 + index + 1}
                            </div>
                            <div className='col-1 product-item'>
                                {item.name}
                            </div>
                           
                            <div className='col-1 product-item'>
                            {item.phone}
                            </div>
                            <div className='col-2 product-item'>
                            {item.address}
                            </div>                          
                            <div className='col-2 product-item'>
                            {
                                    convertTime(item.createdAt)
                                }   
                            </div>
                            <div className='col-1 product-item'>
                            {item.total_price}
                            </div> 
                            <div className='col-1 product-item'>
                            {item.id_receipt}
                            </div> 
                            <div className='col-2 product-item'>
                            {item.status.present}
                            </div>
                            <div className='col-1 product-item'>
                            <IconButton color="primary" >
                                <CheckIcon style={{ fontSize: 20 }}></CheckIcon>
                            </IconButton>
                            <IconButton className='text-danger' color="secondary" aria-label="delete" onClick={() => handleOpenConfirmModal(item)} >
                                <CloseIcon style={{ fontSize: 20 }}></CloseIcon>
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

export default ReceiptManagePage