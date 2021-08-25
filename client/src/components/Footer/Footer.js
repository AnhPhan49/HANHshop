import React from 'react'

const Footer = (props) => {
    
    return(
        <div className='row footer-session'>
        <div className='col-lg-3 col-md-4'>
            <div className='title'>Địa chỉ</div>
            <div className='title'>Số điện thoại</div>
            <div className='title'>Email</div>
        </div>
        <div className='col-lg-3 col-md-4'>
            <div className='title'>
                Thông tin
            </div>
            <div className='item'>
                Về chúng tôi
            </div>
            <div className='item'>
                Thanh toán
            </div>
            <div className='item'>
                Liên hệ
            </div>
        </div>
        <div className='col-lg-3 col-md-4'>
            <div className='title'>
                Liên hệ
            </div>
            <div className='item'>
                Tài khoản của tôi
            </div>
        </div>
        <div className='col-lg-3 col-md-0'>
            <div className='title'>
                Cập nhật thông tin
            </div>
            <div className='item'>
                Để lại địa chỉ Email của bạn
            </div>
        </div>
    </div>
       )
}

export default Footer