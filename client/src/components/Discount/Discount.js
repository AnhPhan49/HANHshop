import React, {useEffect, useState} from 'react'
import SaleItemCard from '../sale-item-card'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ShopApi from '../../apis/shopApis'
import alert from '../../utils/alert'

const Discount = () => {
    const [saleProduct, setSaleProduct] = useState([])    
    const [page, setPage] = useState(1)

    useEffect(() => {
        getSaleProductList(1)
    }, [])

    const getSaleProductList = async (page) => {
        try {
            const res = await ShopApi.getHomePageHotProductData(page, "Sale")                 
            if(res.status === 200) {
                setPage(page)
                setSaleProduct(...saleProduct, res.data.product)
            }
            if(res.status === 201) {
                alert({icon:'error', title: res.message})
            }
        }
        catch (e) {
            console.log(e)
        }
    }
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
                    <div className='text-center mt-5'>
                        <Button variant="outlined" style={{fontSize: '1.4rem'}} onClick={() => getSaleProductList(page+1)}>Xem thêm</Button>
                    </div>
                </div>                      
            </div>         
        </div>
    )
}

export default Discount