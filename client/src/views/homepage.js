import React, { useEffect, useState } from "react";
import BannerItem from "../components/Banner/banner-item";
import SaleItemCard from "../components/sale-item-card";
import Carousel from "react-material-ui-carousel";
import { FcNext, FcPrevious } from "react-icons/fc";
import ShopApi from "../apis/shopApis";
import AdminApi from "../apis/adminApis";
import LoadingPage from "./loading-page";

import { Link } from "react-router-dom";

var items = [
  {
    name: "Chào mừng tới Mặp Mặp",
    title: "Bạn cần mua đồ? Okay hãy đến với chúng tôi",
    desc: "Chúng tôi cung cấp cho bạn các dịch vụ mua bán online",
    img: "https://tgroup.vn/uploads/images/service/top-thuong-hieu-do-gia-dung-han-quoc-duoc-yeu-thich-nhat-tgroup-travel-2.jpg",
  },
  {
    name: "Sản phẩm hot nhất",
    title: "Máy xay đa năng Kangaroo KG2B3",
    desc: "Máy xay đa năng Kangaroo xay hoa quả, rau củ, ngũ cốc, thực phẩm khô với 2 cối xay",
    img: "https://mekoong.com/wp-content/uploads/2021/06/phillip.jpg",
  },
];

const Homepage = () => {
  const [saleProduct, setSaleProduct] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getAllData()
    window.scrollTo(0, 0);
  }, []);

  const getAllData = async () => {
    setLoader(true)
    await getSaleProductList();
    await getNewProductList();
    setLoader(false)
  }

  const getSaleProductList = async () => {
    try {
      
      const res = await ShopApi.getHomePageHotProductData(1, "Sale");
      if (res.status === 200) {
        setSaleProduct(res.data.product);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getNewProductList = async () => {
    try {
      const res = await AdminApi.getProductList(1);

      if (res.status === 200) {
        setProductList(res.data.product);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="homepage">
      {loader ? (
        <LoadingPage></LoadingPage>
      ) : (        
        <div>
          <Carousel
            NextIcon={<FcNext className="arrow-icon" />}
            PrevIcon={<FcPrevious className="arrow-icon" />}
            fullHeightHover={false}
          >
            {items.map((ele, i) => (
              <BannerItem
                key={i}
                banner_img={ele.img}
                banner_title={ele.name}
                banner_title_1={ele.title}
                banner_desc={ele.desc}
              />
            ))}
          </Carousel>
          <div className="homepage-body mt-2">
            <div className="sale-section">
              <h3>Deal chớp nhoáng</h3>
              <div className="row sale-control">
                <div className="sale-title col-6">
                  <div>Đang bán</div>
                </div>
                <div className="col-6">
                  <Link to="/discount">
                    <button type="button">Xem tất cả sản phẩm</button>
                  </Link>
                </div>
              </div>
              <div className="row sale-items m-0">
                {saleProduct &&
                  saleProduct.map((item, i) => (
                    <div className="col-lg-2 col-md-3 col-sm-4 mt-5" key={i}>
                      <Link to={`/detail/${item._id}`} style={{ textDecoration: 'none' }}>
                        <SaleItemCard
                          img_src={item.image}
                          title={item.name}
                          sale_price={item.price_after_sale}
                          base_price={item.price}
                          discount_percent={item.sale_tag}
                        ></SaleItemCard>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
            <div className="category-section">
              <h3>Sản phẩm mới nhất</h3>
              <div className="row sale-control">
                <div className="sale-title col-6">
                  <div>Mới nhất</div>
                </div>
                <div className="col-6">
                  <Link to="/product">
                    <button type="button">Xem tất cả sản phẩm</button>
                  </Link>
                </div>
              </div>
              <div className="row sale-items m-0">
                {productList &&
                  productList.map((item, i) => (                       
                    <div className="col-lg-2 col-md-3 col-sm-4 mt-5" key={i}>
                      <Link to={`/detail/${item._id}`} style={{ textDecoration: 'none' }}>
                        <SaleItemCard
                          img_src={item.image}
                          title={item.name}
                          sale_price={item.price_after_sale}
                          base_price={item.price}
                          discount_percent={item.sale_tag}
                        ></SaleItemCard>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
