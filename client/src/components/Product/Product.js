import React, {useState} from 'react'
import SaleItemCard from '../sale-item-card'
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
    
    return(

        <div className="header_slide">
        <div className="header_bottom_left">				
          <div className="categories">
            <ul>          
              <li><a href="#">Mobile Phones</a></li>
              <li><a href="#">Desktop</a></li>
              <li><a href="#">Laptop</a></li>
              <li><a href="#">Accessories</a></li>
              <li><a href="#">Software</a></li>
              <li><a href="#">Sports &amp; Fitness</a></li>
              <li><a href="#">Footwear</a></li>
              <li><a href="#">Jewellery</a></li>
              <li><a href="#">Clothing</a></li>
              <li><a href="#">Home Decor &amp; Kitchen</a></li>
              <li><a href="#">Beauty &amp; Healthcare</a></li>
              <li><a href="#">Toys, Kids &amp; Babies</a></li>
            </ul>
          </div>					
        </div>
        <div className="header_bottom_right">	
        <div className='homepage'>
           
          
            <div className='homepage-body mt-2'>
                <div className='sale-section'>
                    <h3>
                        Ưu Đãi
                    </h3>
                    <div className='row sale-control'>
                        <div className='sale-title col-6'>
                            <div>
                            Đang Giảm Giá
                            </div>                            
                        </div>                      
                        <div className='col-6'>
                            <button type='button'>Xem toàn bộ sản phẩm</button>
                        </div>                                                          
                    </div>
                    <div className='row sale-items mt-3'>
                        {
                            sale_items.map((item, i) =>
                            <div className='col-lg-2 col-md-3 mt-4'>
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