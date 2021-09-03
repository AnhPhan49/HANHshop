import React, { useState, useEffect } from "react";
import SaleItemCard from "../sale-item-card";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ShopApi from "../../apis/shopApis";
import AdminApi from "../../apis/adminApis";
import Button from "@material-ui/core/Button";
import { saveCategoryData } from "../../reducers/shopReducer";
import LoadingPage from "../../views/loading-page";

const Product = () => {
  let { id, ed } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getCategoryList();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getNewProductList(1);
    window.scrollTo(0, 0);
  }, [id]);

  const getCategoryList = async () => {
    try {
      const res = await ShopApi.getCategoryList();
      if (res.status === 200) {
        setCategoryList(res.data);
        dispatch(saveCategoryData(res.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getNewProductList = async (page) => {
    try {
      setLoader(true);
      let res = null;
      if (id) {
        res = await AdminApi.searchProductByCategory(page, id);
      } else if (ed) {
        res = await AdminApi.searchProductByProduct(page, ed);
      } else {
        res = await AdminApi.getProductList(page);
      }
      if (res.status === 200) {
        setPage(page);
        setProductList(res.data.product);
      }
    } catch (e) {
      console.log(e);
    }
    setLoader(false);
  };

  const getMoreProductList = async (page) => {
    try {
      let res = null;
      if (id) {
        res = await AdminApi.searchProductByCategory(page, id);
      } else if (ed) {
        res = await AdminApi.searchProductByProduct(page, ed);
      } else {
        res = await AdminApi.getProductList(page);
      }
      if (res.status === 200) {
        setPage(page);
        setProductList(productList.concat(res.data.product));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {loader ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className="content">
          <div className="row m-0 section group detail-section">
            <div className="span_3_of_1 col-lg-3 col-sm-12">
              <ul>
                {categoryList.map((item, index) => (
                  <Link key={index} to={`/category/${item._id}`}>
                    <li>
                      <a>{item.name}</a>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="header_bottom_right col-lg-9 col-sm-12">
              <div className="homepage">
                <div className="homepage-body mt-2">
                  <div className="sale-section">
                    <h3>Danh sách sản phẩm</h3>
                    <div className="row sale-items mt-3">
                      {productList &&
                        productList.map((item, i) => (
                          <div key={i} className="col-lg-3 col-md-4 mt-5">
                            <Link
                              to={`/detail/${item._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <SaleItemCard
                                key={i}
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
              <div className="text-center mt-5">
                <Button
                  variant="outlined"
                  style={{ fontSize: "1.4rem" }}
                  onClick={() => getMoreProductList(page + 1)}
                >
                  Xem thêm
                </Button>
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
