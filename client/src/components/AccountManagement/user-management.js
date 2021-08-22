import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

const UserManagement = () => {
    const [accountList, setAccountList] = useState([])
    const accountdata = useSelector ((state) => state.accountdata.customerAccountData)

    useEffect(() => {
        setAccountList(accountdata)
    },[accountdata])

    return(
        <div className='production-page'>
            <div className='row m-0 title'>
                <div className='col-2 text-center'>
                    STT
                </div>
                <div className='col-4 text-center'>
                    Tên
                </div>
                <div className='col-2 text-center'>
                    Ngày tạo
                </div>
                <div className='col-2 text-center'>
                    Trạng thái
                </div>
                <div className='col-2 text-center'>
                    Tùy chỉnh
                </div>
            </div>
            <div className='product-list'>
                {
                    accountList && accountList.map((item, index) => (
                        <div>
                            <div>
                                {index + 1}
                            </div>
                            <div>
                                Tên
                            </div>
                            <div>
                                Ngày tạo
                            </div>
                            <div>
                                Trạng thái
                            </div>
                            <div>
                                Tùy chỉnh
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UserManagement