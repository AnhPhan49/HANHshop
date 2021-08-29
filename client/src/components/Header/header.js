import React, {useEffect, useState} from 'react'
import AdminApi from '../../apis/adminApis'
import { GrMail } from 'react-icons/gr'
import {FaPhoneAlt, FaUserAlt} from 'react-icons/fa'
import vnflag from '../../assets/flag-2.jpg'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineHeart, AiOutlineShoppingCart} from 'react-icons/ai'
import { Badge } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userlogoutsuccess, deletecurrentuserdata } from "../../reducers/userReducer";
import logo from '../../assets/logo.png'

const Header = () => {
    const history = useHistory()
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    const [curruser, setCurrUser] = useState()
    const [inputSearch, setInputSearch] = useState()
    
    useEffect(() => {
        setCurrUser(user)        
    }, [user])

    const searchProduct = async () => {
        try {
            let res;
            if (inputSearch) {
                res = await AdminApi.searchProductByProduct(1, inputSearch);
                if(res.status === 200) {                
                    history.push(`/search/${inputSearch}`)
                }
            } else {                                           
                history.push('/product')
            }
               
        } catch (e) {

        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(userlogoutsuccess());
        dispatch(deletecurrentuserdata());
        return history.push("/login");
    };

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
                                <span>
                                    
                                    {curruser.lastname + " " + curruser.firstname}
                                    <span className='ml-3 link' onClick={handleLogout}>
                                        Đăng xuất
                                    </span>
                                </span>
                               
                                
                            ):(
                                <span className='link' onClick={() => history.push('/login')}>Đăng nhập</span>                                               
                            )
                        }                        
                    </div>
                </div>                
            </div>

            <div className='header header-below row'>                
                <div className='logo-session col-lg-2 col-md-12 text-center' onClick={()=>history.push('/')}>
                    <img src={logo} alt=''></img>
                </div>
                <div className='search-session col-lg-7 col-md-12 p-0'>
                    <div className='category-btn col-3 text-center'>Tìm kiếm</div>
                    <span className="input-group col-9">
                        <input type="text" placeholder="Bạn cần tìm gì?" value={inputSearch} onChange={(e) => {setInputSearch(e.target.value)}}/>
                        <button type="button" onClick={searchProduct}><BsSearch color='white' size='18px'></BsSearch></button>
                    </span>
                </div>
                <div className='cart-session col-lg-3 col-md-12 row'>
                    {/* <div className='col-6 heart-icon'>
                        <Badge color='error' badgeContent={4}>
                            <AiOutlineHeart size='26px' color='black'></AiOutlineHeart>
                        </Badge>
                    </div> */}
                    <div className='cart-icon text-center' onClick={() => {history.push('/receipt')}}>                    
                        {/* <Badge color='error' badgeContent={4}> */}
                            <AiOutlineShoppingCart size='26px' color='black'></AiOutlineShoppingCart>
                            <span>Giỏ hàng</span>
                        {/* </Badge>                         */}
                    </div>
                </div>
            </div>
        </div>)
}

export default Header