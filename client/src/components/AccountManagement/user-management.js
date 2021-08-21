import React, {useEffect, useState} from 'react'
import AdminApi from '../../apis/adminApis'

const UserManagement = () => {
    const [accountList, setAccountList] = useState([])

    useEffect(() => {

    },[])

    const getUserList = async () => {
        try {
            const res = AdminApi.getCustomerAccountList();
            if(res === 200) {
                
            }
        } catch(e) {

        }
    }

    return(
        <div className='production-page'>
            <div className='row m-0 title'>
                <div>
                    STT
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
            <div>
                {
                    accountList.map((item, index) => (
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