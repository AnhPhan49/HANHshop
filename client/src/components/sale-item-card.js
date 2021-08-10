import React from 'react'

const SaleItemCard = (props) => {
    return(
        <div className='sale-item-card'>
            <img alt='' src={props.img_src}></img>
            <div className='title'>
                {props.title}
            </div>
            <div className='sale-price'>
                {props.sale_price}
                <span>-{props.discount_percent}</span>
            </div>
            <div className='base-price'>
                {props.base_price}                
            </div>
        </div>
    )
}

export default SaleItemCard