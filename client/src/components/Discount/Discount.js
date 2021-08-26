import React, {useEffect} from 'react'


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



const Discount = (props) => {
    return(
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
    )
}

export default Discount