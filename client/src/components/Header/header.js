import React, {useEffect, useState} from 'react'
import { GrMail } from 'react-icons/gr'
import {FaPhoneAlt, FaUserAlt} from 'react-icons/fa'
import vnflag from '../../assets/flag-2.jpg'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineHeart, AiOutlineShoppingCart} from 'react-icons/ai'
import { Badge } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const history = useHistory()
    const user = useSelector(state => state.user.user)
    const [curruser, setCurrUser] = useState()
    
    useEffect(() => {
        setCurrUser(user)
        console.log(user)
    }, [user])

    return(
        <div>
            <div className='header row'>
                <div className='hd-left row col-lg-6 col-md-6 hidden-xs'>
                    <div className='header-item col-6'>
                        <GrMail size='16px' color='black'></GrMail>
                        <span className=''>something@gmail.com</span>
                    </div>
                    <div className='header-item col-6'>
                        <FaPhoneAlt size='16px' color='black'></FaPhoneAlt>
                        <span>+123456</span>
                    </div>
                </div>
                <div className='hd-right row col-lg-6 col-md-6 col-12'>
                    <div className='header-item col-6'>
                        <img src={vnflag} alt=''></img>
                        <span>
                            Vietnam
                        </span>
                    </div>
                    <div className='header-item col-6'>
                        <FaUserAlt className='user-icon' size='16px'></FaUserAlt>
                        {
                            curruser?(
                                <span onClick={() => history.push('/login')}>
                                    {curruser.lastname + " " + curruser.firstname}
                                </span>
                            ):(
                                <span onClick={() => history.push('/login')}>Đăng nhập</span>
                            )
                        }                        
                    </div>
                </div>                
            </div>

            <div className='header header-below row'>
                <div className='logo-session col-lg-2 col-md-12'>
                    <div>HANH <span> Shop</span></div>
                </div>
                <div className='search-session col-lg-7 col-md-12 p-0'>
                    <div className='category-btn col-3 text-center'>Tìm kiếm</div>
                    <span className="input-group col-9">
                        <input type="text" placeholder="Bạn cần tìm gì?"/>
                        <button type="button"><BsSearch color='white' size='18px'></BsSearch></button>
                    </span>
                </div>
                <div className='cart-session col-lg-3 col-md-12 row'>
                    <div className='col-6 heart-icon'>
                        <Badge color='error' badgeContent={4}>
                            <AiOutlineHeart size='26px' color='black'></AiOutlineHeart>
                        </Badge>
                    </div>
                    <div className='col-6 cart-icon' onClick={() => {history.push('/receipt')}}>                    
                        <Badge color='error' badgeContent={4}>
                            <AiOutlineShoppingCart size='26px' color='black'></AiOutlineShoppingCart>
                        </Badge>                        
                    </div>
                </div>
            </div>
        </div>)
}

export default Header