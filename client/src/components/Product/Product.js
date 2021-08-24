import React, {useState, useEffect} from 'react'
import SaleItemCard from '../sale-item-card'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import ShopApi from '../../apis/shopApis'
import {saveCategoryData} from '../../reducers/shopReducer'

var sale_items = [
    {
        img:'https://cbu01.alicdn.com/img/ibank/O1CN01kEAcoj1cpHusIuLsR_!!2211230903649-0-cib.jpg',
        title:'Thảm trải dài chống trượt không đường khâu vá Mingde xốp',
        sale_price:'2.000 đ',
        base_price:'30.000 đ',
        discount_percent: '30%'
    },
    {
        img:'https://cbu01.alicdn.com/img/ibank/O1CN01kEAcoj1cpHusIuLsR_!!2211230903649-0-cib.jpg',
        title:'Thảm trải dài chống trượt không đường khâu vá Mingde xốp',
        sale_price:'2.000 đ',
        base_price:'30.000 đ',
        discount_percent: '30%'
    },
    {
        img:'https://cbu01.alicdn.com/img/ibank/O1CN01kEAcoj1cpHusIuLsR_!!2211230903649-0-cib.jpg',
        title:'Thảm trải dài chống trượt không đường khâu vá Mingde xốp',
        sale_price:'2.000 đ',
        base_price:'30.000 đ',
        discount_percent: '30%'
    },
    {
        img:'https://cbu01.alicdn.com/img/ibank/O1CN01kEAcoj1cpHusIuLsR_!!2211230903649-0-cib.jpg',
        title:'Thảm trải dài chống trượt không đường khâu vá Mingde xốp',
        sale_price:'2.000 đ',
        base_price:'30.000 đ',
        discount_percent: '30%'
    },
    {
        img:'https://cbu01.alicdn.com/img/ibank/O1CN01kEAcoj1cpHusIuLsR_!!2211230903649-0-cib.jpg',
        title:'Thảm trải dài chống trượt không đường khâu vá Mingde xốp',
        sale_price:'2.000 đ',
        base_price:'30.000 đ',
        discount_percent: '30%'
    },
    {
        img:'https://cbu01.alicdn.com/img/ibank/O1CN01kEAcoj1cpHusIuLsR_!!2211230903649-0-cib.jpg',
        title:'Thảm trải dài chống trượt không đường khâu vá Mingde xốp',
        sale_price:'2.000 đ',
        base_price:'30.000 đ',
        discount_percent: '30%'
    },
    {
        img:'https://cbu01.alicdn.com/img/ibank/O1CN01kEAcoj1cpHusIuLsR_!!2211230903649-0-cib.jpg',
        title:'Thảm trải dài chống trượt không đường khâu vá Mingde xốp',
        sale_price:'2.000 đ',
        base_price:'30.000 đ',
        discount_percent: '30%'
    },
]
const Product = (props) => {
    const [categoryList, setCategoryList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        getCategoryList()
    },[])

    const getCategoryList = async () => {
        try {
            const res = await ShopApi.getCategoryList()
            console.log(res)
            if(res.status === 200) {
                setCategoryList(res.data)
                dispatch(saveCategoryData(res.data))
            }
        }
        catch(e){
            console.log(e)
        }
    }

    return(
        <div className="header_slide">
        <div className="header_bottom_left">				
          <div className="categories">
            <ul>
                {
                    categoryList.map((item, index) => (
                        <Link key={index}>
                            <li><a>{item.name}</a></li>
                        </Link>
                    ))
                }
            </ul>
          </div>					
        </div>
        <div className="header_bottom_right">	
        <div className='homepage'>
            <div className='homepage-body mt-2'>
                <div className='sale-section'>
                    <h3>
                        Danh sách sản phẩm
                    </h3>
                    <div className='row sale-items mt-3'>
                        {
                            sale_items.map((item, i) =>
                            <div className='col-lg-3 col-md-4 mt-4'>
                                <SaleItemCard key={i} img_src={item.img} title={item.title} sale_price={item.sale_price} base_price={item.base_price} discount_percent={item.discount_percent}></SaleItemCard>
                            </div>)
                        }  
                    </div>
                </div>
                      
            </div>
         
        </div> 
       
        </div>
        <div className="clear" />
      </div>
      )
}

export default Product