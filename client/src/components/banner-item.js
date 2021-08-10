import React from 'react'

const BannerItem = (props) => {
    return(
        <div className='banner-item'>
            <img alt='' src={props.banner_img}></img>
            <div className='container'>
                <div className='row'>
                    <div className='banner-info col-lg-5'>
                        <span>
                            {props.banner_title}
                        </span>
                        <h1>
                            {props.banner_title_1}
                        </h1>
                        <p>
                            {props.banner_desc}
                        </p>
                    </div>                    
                </div>                
            </div>
        </div>
    )
}

export default BannerItem