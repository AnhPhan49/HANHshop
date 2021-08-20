import React from 'react'
import fireicon from '../assets/fire-icon-1.gif'

const NavBar = (props) => {
    return(
        <div className='nav-item'>
            <nav className='nav-menu'>
                <ul>
                    <li>
                        <a href='/'>Trang chủ</a>                                   
                        
                    </li>
                    <li>
                        <a href='/product'>Danh sách sản phẩm</a>
                        <ul className='dropdown'>
                            <li>
                                <a>Đồ gia dụng</a>
                            </li>
                            <li>
                                <a>Dụng cụ bếp</a>
                            </li>
                        </ul>
                        
                    </li>
                    <li>
                        <a href='/discount' >Ưu đãi <span><img src={fireicon} alt=''></img></span></a>                                    
                    </li>
                    <li>
                        <a>Blog</a>
                        
                    </li>
                    <li>
                        <a href='/contact'>Liên hệ</a>
                        
                    </li>
                    <li>
                        <a>Chuyện của HANH</a>                        
                    </li>
                </ul>                
            </nav>
        </div>        
    )
}

export default NavBar