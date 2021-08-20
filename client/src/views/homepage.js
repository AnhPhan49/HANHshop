import React, {useEffect} from 'react'
import Header from '../components/header'
import NavBar from '../components/navbar'
import BannerItem from '../components/banner-item'
import SaleItemCard from '../components/sale-item-card'
import CategoryCard from '../components/category-card'
import Carousel from 'react-material-ui-carousel'
import {FcNext, FcPrevious} from 'react-icons/fc'
import Footer from '../components/Footer'
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

const Homepage = (props) => {
    return(
        <div className='homepage'>
            <Header></Header>
            <NavBar></NavBar>
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
                            <button type='button'>Mua toàn bộ sản phẩm</button>
                        </div>                                                          
                    </div>
                    <div className='row sale-items mt-3'>
                        {
                            sale_items.map((item, i) =>
                            <div className='col-lg-2 col-md-3'>
                                <SaleItemCard key={i} img_src={item.img} title={item.title} sale_price={item.sale_price} base_price={item.base_price} discount_percent={item.discount_percent}></SaleItemCard>
                            </div>)
                        }  
                    </div>
                </div>
                <div className='category-section'>
                    <h3>
                        Danh sách mặt hàng
                    </h3>
                    <div className='row category-list'>
                        {
                            category.map((item, i) => 
                            <div className='col-lg-2 col-md-3 mb-4'>
                                <CategoryCard key={i} img_url={item.img} name={item.title}></CategoryCard>
                            </div>)
                        }
                    </div>
                </div>              
            </div>
            <footer>
             <Footer/>
            </footer>
        </div>
    )
}

export default Homepage