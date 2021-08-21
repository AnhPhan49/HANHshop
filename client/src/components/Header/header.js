import React, {useState} from 'react'
import { GrMail } from 'react-icons/gr'
import {FaPhoneAlt, FaUserAlt} from 'react-icons/fa'
import vnflag from '../../assets/flag-2.jpg'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineHeart, AiOutlineShoppingCart} from 'react-icons/ai'
import { Badge } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

const Header = (props) => {
    const history = useHistory()
    
    return(
        <div>
            <div className='header row'>
                <div className='hd-left row col-8'>
                    <div className='header-item col-4'>
                        <GrMail size='18px' color='black'></GrMail>
                        <span className=''>something@gmail.com</span>
                    </div>
                    <div className='header-item col-8'>
                        <FaPhoneAlt size='18px' color='black'></FaPhoneAlt>
                        <span>+123456</span>
                    </div>
                </div>
                <div className='hd-right row col-4'>
                    <div className='header-item col-6'>
                        <img src={vnflag} alt=''></img>
                        <span>
                            Vietnam
                        </span>
                    </div>
                    <div className='header-item col-6'>
                        <FaUserAlt className='user-icon' size='18px'></FaUserAlt>
                        <span onClick={() => history.push('/login')}>Đăng nhập</span>
                    </div>
                </div>                
            </div>

            <div className='header header-below row'>
                <div className='logo-session col-2'>
                    <div>HANH <span> Shop</span></div>
                </div>
                <div className='search-session col-7'>
                    <button type='button' className='category-btn col-3'>Tìm kiếm</button>
                    <span className="input-group col-9">
                        <input type="text" placeholder="Bạn cần tìm gì?"/>
                        <button type="button"><BsSearch color='white' size='18px'></BsSearch></button>
                    </span>
                </div>
                <div className='cart-session col-3 row'>
                    <div className='col-6 heart-icon'>
                        <Badge color='error' badgeContent={4}>
                            <AiOutlineHeart size='26px' color='black'></AiOutlineHeart>
                        </Badge>
                    </div>
                    <div className='col-6 cart-icon'>
                        <a href='/receipt'>
                        <Badge color='error' badgeContent={4}>
                            <AiOutlineShoppingCart size='26px' color='black'></AiOutlineShoppingCart>
                        </Badge>
                        </a>
                    </div>
                </div>
            </div>
        </div>)
}

export default Header