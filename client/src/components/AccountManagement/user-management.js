import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { FaUserSlash, FaUser, FaEdit } from "react-icons/fa";
import IconButton from '@material-ui/core/IconButton';
import ConfirmModal from '../confirm-modal'
import AdminApi from '../../apis/adminApis';
import alert from '../../utils/alert'

const UserManagement = (props) => {
    const [accountList, setAccountList] = useState([])
    const accountdata = useSelector ((state) => state.accountdata.customerAccountData)
    const [actionAccountId, setActionAccountId] = useState()
    const [openConfirmModal,setOpenConfirmModal] = useState(false)
    const [btnState, setBtnState] = useState(false)

    useEffect(() => {
        setAccountList(accountdata)
    },[accountdata])

    const convertTime = (unformatTime) => {        
        let date = new Date(unformatTime)
        const formatedTime = date.getDate() + " / " + (date.getMonth() + 1) + " / " + date.getFullYear();                    
        return formatedTime
    }

    const blockUser = async () => {
        try {
            setBtnState(true)
            const res = await AdminApi.blockAccount(actionAccountId)
            if(res.status === 200) {
                alert({icon:'success', title: res.message, msg: 'Thao tác thành công'})
            }
        }
        catch(e) {
            console.log(e)
        }
        setBtnState(false)
        handleCloseConfirmModalAfterSave()    
        props.reloadData()
    }

    const handleOpenConfirmModal = (id) => {
        setActionAccountId(id)
        setOpenConfirmModal(true)
    }

    const handleCloseConfirmModalAfterSave = () => {
        setActionAccountId()
        setOpenConfirmModal(false)
    }

    

    return(
        <div
            role="tabpanel"
            hidden={props.value !== props.index}
            id={`full-width-tabpanel-${props.index}`}
            aria-labelledby={`full-width-tab-${props.index}`}
            className='production-page'>
            <ConfirmModal open={openConfirmModal} handleClose={()=> setOpenConfirmModal(false)} accept={blockUser} buttonState={btnState}></ConfirmModal>
            <div className='row m-0 title'>
                <div className='col-2 text-center'>
                    STT
                </div>
                <div className='col-4 text-center'>
                    Tên đầy đủ
                </div>
                <div className='col-3 text-center'>
                    Ngày tạo
                </div>
                <div className='col-3 text-center'>
                    Trạng thái
                </div>
                {/* <div className='col-2 text-center'>
                    Tùy chỉnh
                </div> */}
            </div>
            <div className='product-list'>
                {
                    accountList&&accountList.length?(accountList.map((item, index) => (
                        <div key={index} className='row m-0 product-row' style={{background: `${(index%2===0)?'#ebebeb':''}`}}>
                            <div className='col-2 product-item'>
                                {index + 1}
                            </div>
                            <div className='col-4 product-item'>
                                {item.fullname}
                            </div>
                            <div className='col-3 product-item'>
                                {convertTime(item.createdAt)}
                            </div>
                            <div className='col-3 product-item'>
                                <IconButton color="primary" onClick={() => handleOpenConfirmModal(item._id)}>   
                                {item.blocked?(
                                    <FaUserSlash size={20} color='gray'></FaUserSlash>
                                ): (
                                    <FaUser size={20} className='text-primary'></FaUser>
                                )}
                                </IconButton>
                            </div>
                            {/* <div className='col-2 product-item'>
                                <IconButton color="primary" >
                                    <FaEdit size={20} ></FaEdit>
                                </IconButton>
                            </div> */}
                        </div>
                    ))):(
                        <div className='text-center mt-4'>
                            <h5>Không có dữ liệu trả về</h5>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default UserManagement