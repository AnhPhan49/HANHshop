import React, {useState, useEffect} from 'react'
import SaleItemCard from '../sale-item-card'
import {Link, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import ShopApi from '../../apis/shopApis'
import AdminApi from '../../apis/adminApis'
import Button from '@material-ui/core/Button';
import {saveCategoryData} from '../../reducers/shopReducer'

const Product = (props) => {
    let { id } = useParams()
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [categoryList, setCategoryList] = useState([])
    const [productList, setProductList] = useState([])

    useEffect(() => {        
        getCategoryList()
    },[])

    useEffect(()=> {
        getNewProductList(1)
    }, [id])

    const getCategoryList = async () => {
        try {
            const res = await ShopApi.getCategoryList()            
            if(res.status === 200) {
                setCategoryList(res.data)
                dispatch(saveCategoryData(res.data))
            }
        }
        catch(e){
            console.log(e)
        }
    }

    const getNewProductList = async (page) => {
        try {
            let res = null;
            if (id) {
                res = await AdminApi.searchProductByCategory(page, id)                
            } else {
                res = await AdminApi.getProductList(page)
            }
            if (res.status === 200) {
                setPage(page)
                setProductList(res.data.product)
            }
        }
        catch(e) {
            console.log(e)
        }
    }

    const getMoreProductList = async (page) => {
        try {
            let res = null;
            if (id) {
                res = await AdminApi.searchProductByCategory(page, id)                
            } else {
                res = await AdminApi.getProductList(page)
            }
            if (res.status === 200) {
                setPage(page)
                setProductList(productList.concat(res.data.product))
            }
        }
        catch(e) {
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
                        <Link key={index} to={`/category/${item._id}`}>
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
                                productList && productList.map((item, i) =>
                                <div className='col-lg-3 col-md-4 mt-3'>
                                    <Link to={`/detail/${item._id}`}>
                                        <SaleItemCard key={i} img_src={item.image} title={item.name} sale_price={item.price_after_sale} base_price={item.price} discount_percent={item.sale_tag}></SaleItemCard>
                                    </Link>                                
                                </div>)
                            }
                        </div>
                    </div>                      
                </div>         
            </div>
            <div className='text-center mt-5'>
                <Button variant="outlined" style={{fontSize: '1.4rem'}} onClick={() => getMoreProductList(page+1)}>Xem thêm</Button>
            </div>
        </div>
        <div className="clear" />
      </div>
      )
}

export default Product