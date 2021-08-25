import React, {useEffect, useState} from 'react'
import BannerItem from '../components/Banner/banner-item'
import SaleItemCard from '../components/sale-item-card'
import CategoryCard from '../components/category-card'
import Carousel from 'react-material-ui-carousel'
import {FcNext, FcPrevious} from 'react-icons/fc'
import ShopApi from '../apis/shopApis'

import {Link} from 'react-router-dom'

var items = [
    {
        name: "Chào mừng tới HANH Shop",
        title: "Bạn cần mua đồ? Okay hãy đến với chúng tôi",
        desc: "Chúng tôi cung cấp cho bạn các dịch vụ mua bán online",
        img: 'https://tgroup.vn/uploads/images/service/top-thuong-hieu-do-gia-dung-han-quoc-duoc-yeu-thich-nhat-tgroup-travel-2.jpg'
    },
    {
        name: "Chào mừng tới HANH Shop",
        title: "Bạn cần mua đồ? Okay hãy đến với chúng tôi",
        desc: "Chúng tôi cung cấp cho bạn các dịch vụ mua bán online",
        img: 'https://mekoong.com/wp-content/uploads/2021/06/phillip.jpg'
    }
]

var category = [
    {
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    },
    {
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    },
    {
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    },
    {
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    },
    {
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    },
    {
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    },
    {
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    },
    {
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    },{
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    },{
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    },
    {
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    },
    {
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    },
    {
        img:'https://vn-test-11.slatic.net/p/0a4e5b8c0fa49b964a3bd07beedaf68c.jpg_80x80Q100.jpg_.webp',
        title: 'Bàn phím chơi game'
    }
]

const Homepage = () => {
    const [saleProduct, setSaleProduct] = useState([])

    useEffect(() => {
        getSaleProductList()
    }, [])

    const getSaleProductList = async () => {
        try {
            const res = await ShopApi.getHomePageHotProductData(1, "Sale")            
            if(res.status === 200) {
                setSaleProduct(res.data.product)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return(
        <div className='homepage'>        
            <Carousel
                NextIcon={<FcNext className='arrow-icon'/>}
                PrevIcon={<FcPrevious className='arrow-icon'/>}>
            {
                items.map( (ele, i) => <BannerItem key={i} banner_img={ele.img} banner_title={ele.name} banner_title_1={ele.title} banner_desc={ele.desc}/> )
            }
            </Carousel>
            <div className='homepage-body mt-2'>
                <div className='sale-section'>
                    <h3>
                        Deal chớp nhoáng
                    </h3>
                    <div className='row sale-control'>
                        <div className='sale-title col-6'>
                            <div>
                            Đang bán
                            </div>                            
                        </div>
                        <div className='col-6'>
                            <Link to='/discount'>
                                <button type='button'>Xem tất cả sản phẩm</button>
                            </Link>                            
                        </div>                                                          
                    </div>
                    <div className='row sale-items m-0'>
                        {
                            saleProduct && saleProduct.map((item, i) =>
                            <div className='col-lg-2 col-md-3 mt-3' key={i}>
                                <Link to={`/detail/${item._id}`}>
                                    <SaleItemCard img_src={item.image} title={item.name} sale_price={item.price_after_sale} base_price={item.price} discount_percent={item.sale_tag}></SaleItemCard>
                                </Link>                                
                            </div>)
                        }
                    </div>
                </div>
                <div className='category-section'>
                    <h3>
                        Danh sách mặt hàng
                    </h3>
                    <div className='row category-list m-0'>
                        {
                            category.map((item, i) => 
                            <div className='col-lg-2 col-md-3 mb-4'>
                                <CategoryCard key={i} img_url={item.img} name={item.title}></CategoryCard>
                            </div>)
                        }
                    </div>
                </div>              
            </div>            
        </div>
    )
}

export default Homepage