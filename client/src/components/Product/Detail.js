import React, { useState, useEffect } from "react";
import SaleItemCard from "../sale-item-card";
import { useParams, Link } from "react-router-dom";
import ShopApi from "../../apis/shopApis";
import AdminApi from "../../apis/adminApis";
import { saveCategoryData } from "../../reducers/shopReducer";
import { useDispatch } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { FcNext, FcPrevious } from "react-icons/fc";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import LoadingPage from "../../views/loading-page";
import CardMedia from "@material-ui/core/CardMedia";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Detail = () => {
  const classes = useStyles();
  let { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [relateProduct, setRelateProduct] = useState([]);
  const [specify, setSpecify] = useState([]);
  const [loader, setLoader] = useState(true);
  const [btnState, setBtnState] = useState(false);

  useEffect(() => {
    getCategoryList();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllData();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    getRelateProduct();
  }, [product]);

  const getAllData = async () => {
    setLoader(true);
    await getProduct();
    await setQuantity(1);
    setLoader(false);
  };

  const formatCurrency = (price) => {
    return price.toLocaleString("it-IT");
  };

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

  const getRelateProduct = async () => {
    try {
      const res = await AdminApi.searchProductByCategory(1, product.category);
      if (res.status === 200) {
        setRelateProduct(res.data.product);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getProduct = async () => {
    try {
      const res = await ShopApi.getProductDetail(id);
      if (res.status === 200) {
        setProduct(res.data);
        const temp = await formatSpecifyData(res.data.specifications);
        setSpecify([...temp]);

        if (res.data.available === false) {
          setBtnState(true);
        } else {
          setBtnState(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const formatSpecifyData = (arrayData) => {
    const temp = [];
    arrayData.forEach((ele, i) => {
      temp.push(JSON.parse(ele));
    });
    return temp;
  };

  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const data = {
        id: id,
        count: quantity,
      };

      const res = await ShopApi.addToCart(data);
      if (res.status === 200) {
        setOpen(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      {loader ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              <div style={{ fontSize: "1.4rem" }}>???? th??m v??o gi??? h??ng</div>
            </Alert>
          </Snackbar>
          <div className="content">
            <div className="section group row m-0 detail-section">
              <div className="col-lg-3 col-sm-12 span_3_of_1">
                <h3>Th??ng s??? k??? thu???t</h3>
                {specify.length &&
                  specify.map((ele, ind) => (
                    <div
                      className="row m-0 p-0"
                      key={ind}
                      style={{
                        backgroundColor:
                          ind % 2 === 0 ? "rgba(245,245,245,255)" : "white",
                        fontSize: "1.5rem",
                        padding: "1.7rem",
                      }}
                    >
                      <div className="col-5" style={{ fontWeight: "550" }}>
                        {ele.key}:
                      </div>
                      <div className="col-7">{ele.value}</div>
                    </div>
                  ))}
                {/* <ul>
                  {categoryList.map((item, index) => (
                    <Link key={index} to={`/category/${item._id}`}>
                      <li>
                        <a>{item.name}</a>
                      </li>
                    </Link>
                  ))}
                </ul> */}
              </div>
              <div className="col-lg-9 col-sm-12">
                <div className="product-details">
                  <div className="images_3_of_2">
                    <div id="container">
                      <div id="products_example">
                        <div id="products">
                          <Carousel
                            NextIcon={<FcNext size={20} />}
                            PrevIcon={<FcPrevious size={20} />}
                          >
                            {product &&
                              product.image.map((item, index) => (
                                <CardMedia
                                  key={index}
                                  component="img"
                                  image={item.url}
                                />
                              ))}
                          </Carousel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="desc span_3_of_2">
                    <h2>{product && product.name}</h2>
                    {product && product.sale_tag ? (
                      <div>
                        <span className="percent-sale-detail">
                          Gi???m {product.sale_tag}%
                        </span>
                        <span className="base-price-detal">
                          {formatCurrency(product.price)}??
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="price">
                      <p>
                        M?? s???n ph???m: <span>{product.id_product}</span>
                      </p>
                    </div>
                    <div className="price">
                      {product && (
                        <p>
                          Gi??:{" "}
                          <span>
                            {product.price_after_sale
                              ? formatCurrency(product.price_after_sale)
                              : formatCurrency(product.price)}
                            ??
                          </span>
                        </p>
                      )}
                    </div>
                    <div>
                      {product && product.available === false && (
                        <h4 className="text-danger">S???n ph???m ???? h???t h??ng</h4>
                      )}
                    </div>
                    <div className="share-desc mt-5">
                      <form onSubmit={addToCart}>
                        {btnState === false && (
                          <div className="row m-0">
                            <div className="col-6">
                              <TextField
                                InputLabelProps={{
                                  classes: {
                                    root: classes.resize,
                                  },
                                }}
                                value={quantity}
                                onWheel={(e) => e.target.blur()}
                                onChange={(e) => {
                                  setQuantity(e.target.value);
                                }}
                                InputProps={{
                                  classes: {
                                    input: classes.resize,
                                  },
                                  inputProps: {
                                    min: 1,
                                  },
                                }}
                                required
                                type="number"
                                label="S??? l?????ng"
                              />
                            </div>
                            <div className="col-6">
                              <button
                                className="button"
                                type="submit"
                                style={{
                                  border: 0,
                                  backgroundColor: "transparent",
                                  marginTop: "16px",
                                }}
                              >
                                <span>
                                  <a>Th??m v??o gi??? h??ng</a>
                                </span>
                              </button>
                            </div>
                          </div>
                        )}
                      </form>
                      <div className="clear" />
                    </div>
                  </div>
                  <div className="clear" />
                </div>
                <div>
                  <h3 style={{ color: "gray" }}>M?? t??? s???n ph???m</h3>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: product && product.description,
                    }}
                  ></span>
                </div>
                <div className="content_bottom">
                  <div className="heading">
                    <h3>S???n ph???m li??n quan</h3>
                  </div>
                  <div className="see">
                    <p>
                      {product && (
                        <Link to={`/category/${product.category}`}>
                          <h5>Xem t???t c??? s???n ph???m</h5>
                        </Link>
                      )}
                    </p>
                  </div>
                  <div className="clear" />
                </div>
                <div>
                  {relateProduct &&
                    relateProduct.map((item, i) => (
                      <div className="col-lg-3 col-md-4 col-sm-4 mt-5" key={i}>
                        <Link
                          to={`/detail/${item._id}`}
                          style={{ textDecoration: "none" }}
                        >
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
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  resize: {
    fontSize: "1.5rem",
  },
}));

export default Detail;
