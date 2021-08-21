import React from 'react'
import fireicon from '../../assets/fire-icon-1.gif'
import {
    BrowserRouter as Router,
    Route, 
    Link ,
    NavLink
} from "react-router-dom";
const NavBar = (props) => {
    return(
        <div className='nav-item'>
            <nav className='nav-menu'>
                <ul className='nav-container'>
                    <li>
                    <NavLink to="/">Trang Chủ</NavLink>                       
                    </li>
                    <li>
                    <NavLink to="/product">Danh Sách Sản Phẩm</NavLink>
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
                    <NavLink to="/discount">Ưu Đãi<span><img src={fireicon} alt=''></img></span></NavLink>                             
                    </li>
                 
                    <li>
                    <NavLink to="/contact">Liên Hệ</NavLink>
                        
                    </li>
                    <li>
                    <NavLink to="/booked">Đơn Hàng</NavLink>                    
                    </li>
                </ul>                
            </nav>
        </div>        
    )
}

export default NavBar