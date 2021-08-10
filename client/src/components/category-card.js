import React from 'react'

const CategoryCard = (props) => {
    return(
        <div className='category-card'>
            <img alt='' src={props.img_url}></img>
            <div>
                {
                    props.name
                }
            </div>
        </div>
    )
}

export default CategoryCard