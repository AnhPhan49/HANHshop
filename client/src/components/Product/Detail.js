import React, { useState, useEffect } from "react";
import SaleItemCard from "../sale-item-card";
import { useParams, Link } from "react-router-dom";
import ShopApi from "../../apis/shopApis";
import AdminApi from '../../apis/adminApis'
import {saveCategoryData} from '../../reducers/shopReducer'
import {useDispatch} from 'react-redux'
import Carousel from 'react-material-ui-carousel'
import {FcNext, FcPrevious} from 'react-icons/fc'
import Snackbar from '@material-ui/core/Snackbar';

const Detail = (props) => {
  let { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState()
  const [open, setOpen] = React.useState(false)
  const [categoryList, setCategoryList] = useState([]) 
  const [relateProduct, setRelateProduct] = useState([])

  useEffect(() => {    
    getCategoryList()    
  }, []);

  useEffect(() => {
    getProduct()
  }, [id])

  useEffect(() => {    
    getRelateProduct()    
  }, [product]);

  const formatCurrency = (price) => {
    return price.toLocaleString('it-IT');                
  }
  
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

  const getRelateProduct = async () => {
    try {
      const res = await AdminApi.searchProductByCategory(1, product.category)          
        if(res.status === 200) {
          setRelateProduct(res.data.product)
        }
      }
      catch (e) {
        console.log(e)
    }
  }

  const getProduct = async () => {
    try {
      const res = await ShopApi.getProductDetail(id);      
      if (res.status === 200) {
        setProduct(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addToCart = async () => {
    try {
      const data = {
        "id": id,
        "count": 1
      }
      const res = await ShopApi.addToCart(data)
      if(res.status === 200) {
        setOpen(open)
        handleClose()
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleClose = (event, reason) => {
    setTimeout(() => {
      setOpen(false);
    }, 3000)
  };


  return (
    <div className="main">
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Đã thêm vào giỏ hàng"
      />
      <div className="content">
        <div className="section group">
          <div className="cont-desc span_1_of_2">
            <div className="product-details">
              <div className="grid images_3_of_2">
                <div id="container">
                  <div id="products_example">
                    <div id="products">                      
                      <Carousel
                          NextIcon={<FcNext size={20}/>}
                          PrevIcon={<FcPrevious size={20}/>}>
                      {                        
                        product && product.image.map((item, index) => (
                          <img alt='' key={index} src={item.url}></img>                          
                        ))
                      }
                      </Carousel>                    
                    </div>
                  </div>
                </div>
              </div>
              <div className="desc span_3_of_2">
                <h2>{product && product.name}</h2>                
                  {
                    product && product.sale_tag && (
                      <div>
                        <span className='percent-sale-detail'>
                          Giảm {product.sale_tag}%
                        </span>
                        <span className='base-price-detal'>
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                    )
                  }                                                                           
                
                <span dangerouslySetInnerHTML={{__html: product && product.description}}>                      
           			</span> 
                <div className="price">
                  {
                    product && (
                      <p>
                        Giá: <span>đ{product.price_after_sale?formatCurrency(product.price_after_sale):formatCurrency(product.price)}</span>
                      </p>
                    )
                  }                  
                </div>
                <div className="share-desc">
                  <div className="button" onClick={addToCart}>
                    <span>
                      <a>Thêm vào giỏ hàng</a>
                    </span>
                  </div>
                  <div className="clear" />
                </div>
              </div>
              <div className="clear" />
            </div>            
            <div className="content_bottom">
              <div className="heading">
                <h3>Sản phẩm liên quan</h3>
              </div>
              <div className="see">
                <p>
                  <Link to='/product'>
                    <h5>Xem tất cả sản phẩm</h5>
                  </Link>              
                </p>
              </div>
              <div className="clear" />
            </div>
            <div className="section group">
            {
              relateProduct && relateProduct.map((item, i) =>
                <div className='col-lg-3 col-md-4 mt-3'>
                  <Link to={`/detail/${item._id}`}>
                    <SaleItemCard key={i} img_src={item.image} title={item.name} sale_price={item.price_after_sale} base_price={item.price} discount_percent={item.sale_tag}></SaleItemCard>
                  </Link>                  
                </div>)
            }
            </div>
          </div>
          <div className="rightsidebar span_3_of_1">
            <h2>Danh mục</h2>
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
      </div>
    </div>
  );
};

export default Detail;
