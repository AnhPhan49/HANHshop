import React, {useState, useEffect, useRef} from 'react'
import {Button, IconButton} from '@material-ui/core'
import { IoTrashBin, IoAddCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdBrokenImage } from "react-icons/md";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveIcon from '@material-ui/icons/Remove';
import Pagination from '@material-ui/lab/Pagination';
import AdminApi from '../apis/adminApis'
import ReactBnbGallery from 'react-bnb-gallery';
import LinearProgress from '@material-ui/core/LinearProgress';
import InventoryModal from '../components/inventory-modal'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

const InventoryManagePage = (props) => {
    const childRef = useRef();  
    const [loading, setLoader] = useState(true)    
    const [isOpen, setIsOpen] = useState(false)
    const [status,setStatus]=useState(false)
    const [allStatus,settAllStatus]=useState(false)
    const [photoData, setPhotoData] = useState([])   
    const [totalPage, setTotalPage] = useState(1)       
    const [inventoryList, setInventoryList] = useState([])
     
    const [editObj, setEditObj] = useState()
    const [modalTitle, setModalTitle] = useState()    
    const [page,setPage]=useState(1)
    const [pageDetail,setPageDetail]=useState()
    useEffect(() => {
        getInventoryList(1)
    }, [])

    const getInventoryList = async (page) => {
        try{
            setLoader(true)
            const res = await AdminApi.getInventoryList(page);
            setPageDetail(res.data.page)
            // console.log(res.data.page);
            if(res.status === 200) {      
                  
                formatCurrency(res.data.inventory)                 
                setTotalPage(res.data.total_page)
                
            }
        }
        catch(e) {
            console.log(e)
        }
        setLoader(false)
    }

    const handleOpenEditModal = (item) => {
        setModalTitle('Nhập Kho ')
        setEditObj(item);
        setStatus(false);
        settAllStatus(false)
        childRef.current.handleOpenModal()
    };

    const formatCurrency = (data) => {
        // console.log(data)
        data.forEach((item, index) => {
            // if(item.total<=0){
            //     console.log("ok");
            // }
            
            data[index].product.price = item.product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        })
        // console.log(data)
        setInventoryList(data)
    }

    const pageChange = (event, page) => {
        getInventoryList(page)
        setPage(page)
    }

    const handleOpenAddModal = (item) => {
        setModalTitle('Xuất Kho')
        setEditObj(item)
        setStatus(true)
        settAllStatus(false)
        childRef.current.handleOpenModal()
    }
    const handleOpenModal = (item) => {
        setModalTitle('Lịch sử Kho Hàng')
        setEditObj()
        settAllStatus(true);
        childRef.current.handleOpenModal()
    }
    const handleCloseModalAfterSave = () => {        
        getInventoryList(1);
        setPage(1)
    }

// console.log(inventoryList);
    return(
        <div className='production-page'>
            <ReactBnbGallery
                opacity={0.8}
                show={isOpen}
                photos={photoData}
                onClose={() => setIsOpen(false)}
            />
            <InventoryModal all={allStatus} ref={childRef} status={status} title={modalTitle}  page={pageDetail} modalEditFilter={editObj} reloadNewData={handleCloseModalAfterSave}></InventoryModal>                
            <h4>Kho Hàng</h4>        
                <div className='row m-0 title'>
                    <div className='col-1 text-center'>
                        ID
                    </div>
                    <div className='col-2 text-center'>
                        Sản phẩm
                    </div>
                    <div className='col-3 text-center'>
                        Miêu tả
                    </div>
                    <div className='col-2 text-center'>
                        Giá
                    </div>
                    <div className='col-1 text-center'>
                        Số lượng
                    </div>                   
                    <div className='col-3 text-center'>
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
                        inventoryList && inventoryList.map((item, index) => 
                        <div className='row m-0 product-row' style={{background: `${(index%2===0)?'#ebebeb':''}`}} key={item._id}>
                            <div className='col-1 product-item'>
                            {(pageDetail - 1)*10 + index + 1}
                            </div>
                            <div className='col-2 product-item'>
                                {item.product.name}
                            </div>
                           
                            <div className='col-3 product-item' dangerouslySetInnerHTML={{__html: item.product.description}}/>
                            <div className='col-2 product-item'>
                                {item.product.price}
                            </div>                          
                            <div className='col-1 product-item'>
                            {
                                (item.total)                                 
                            }   
                            </div>
                            <div className='col-3 product-item'>
                            <IconButton color="primary" onClick={() => handleOpenModal(item)}>
                            <PlaylistPlayIcon style={{ fontSize: 30 }}></PlaylistPlayIcon>                           
                            </IconButton>
                                <IconButton color="primary" onClick={() => handleOpenEditModal(item)}>
                                    <ControlPointIcon style={{ fontSize: 30 }}></ControlPointIcon>                                   
                                </IconButton>
                                <IconButton color="primary" onClick={() => handleOpenAddModal(item)}>
                                    <RemoveIcon style={{ fontSize: 30 }} ></RemoveIcon>
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

export default InventoryManagePage