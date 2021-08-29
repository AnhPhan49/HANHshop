import React, { useState, useEffect } from "react";
import ShopApi from "../../apis/shopApis";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthPaymentModal from "../authencate-payment-modal";
import { useHistory } from "react-router-dom";
import ConfirmModal from "../confirm-modal";
import alert from "../../utils/alert";
import LoadingPage from "../../views/loading-page";

const Receipt = () => {
  const classes = useStyles();
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [cartInfo, setCartInfo] = useState();
  const [actionItemId, setActionItemId] = useState();
  const [openModal, setOpenModal] = useState();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [updateBtnSt, setUpdateBtnSt] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getCart();
    window.scrollTo(0, 0);
  }, []);

  const getCart = async () => {
    try {
      setLoader(true);
      const res = await ShopApi.getCart();
      if (res.status === 200) {
        formatCartData(res.data.product);
        setCartInfo({
          total_price: res.data.total_price,
          _id: res.data._id,
        });
      }
    } catch (e) {
      console.log(e);
    }
    setLoader(false);
  };

  const formatCurrency = (price) => {
    return price.toLocaleString("it-IT");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const closeAfterSave = () => {
    handleCloseModal();
    setTimeout(() => {
      history.push("/booked");
    }, 2000);
  };

  const formatCartData = async (data) => {
    let temp = [];
    await data.forEach((ele) => {
      const object = {
        _id: ele.id._id,
        name: ele.id.name,
        image: ele.id.image,
        price: ele.id.price_after_sale ? ele.id.price_after_sale : ele.id.price,
        total: ele.total,
        total_price: ele.total_price,
      };
      temp.push(object);
    });

    setCart(temp);
  };

  const handleCartDelete = () => {
    let temp = cart;
    temp = temp.filter((ele) => {
      if (ele._id !== actionItemId) {
        return ele;
      }
    });
    setCart([...temp]);
    handleUpdateCartTotal(temp);
    alert({
      icon: "success",
      title: "Đã xóa sản phẩm",
      msg: "Hãy cập nhật lại giỏ hàng của bạn",
    });
    handleCloseConfirmModal();
  };

  const handleCartChange = (id, e) => {
    const value = e.target.value;
    const temp = cart;
    temp.forEach((ele, index) => {
      if (ele._id === id) {
        temp[index].total = value;
        temp[index].total_price = parseInt(value) * ele.price;
        handleUpdateCartTotal(temp);
        setCart([...temp]);
        return;
      }
    });
  };

  const formatUpdateCartData = () => {
    let data = [];
    cart.forEach((ele) => {
      const item = {
        id: ele._id,
        total: ele.total,
      };
      data.push(item);
    });

    const result = {
      product: data,
    };

    return result;
  };

  const updateCart = async () => {
    try {
      setUpdateBtnSt(true);
      const data = await formatUpdateCartData();
      const res = await ShopApi.updateCart(data);
      if (res.status === 200) {
        alert({ icon: "success", title: "Đã cập nhật giỏ hàng" });
      }
    } catch (e) {
      console.log(e);
    }
    setUpdateBtnSt(false);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  const handleOpenConfirmModal = (id) => {
    setActionItemId(id);
    setOpenConfirmModal(true);
  };

  const handleUpdateCartTotal = (data) => {
    let total = 0;
    data.forEach((item) => {
      total += item.total_price;
    });
    let info = cartInfo;
    info.total_price = total;
    setCartInfo(info);
  };

  return (
    <div className="production-page">
      {loader ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div>
          <ConfirmModal
            open={openConfirmModal}
            handleClose={handleCloseConfirmModal}
            accept={handleCartDelete}
          ></ConfirmModal>
          <AuthPaymentModal
            cartId={cartInfo && cartInfo._id}
            cartTotal={cartInfo && cartInfo.total_price}
            open={openModal}
            handleClose={handleCloseModal}
            closeAfterSave={closeAfterSave}
          ></AuthPaymentModal>
          <div style={{ marginLeft: "20px" }}>
            <h3>Giỏ hàng</h3>
          </div>
          <div className="title row m-0">
            <div className="col-4">Sản phẩm</div>
            <div className="col-2 text-center">Đơn giá</div>
            <div className="col-2 text-center">Số lượng</div>
            <div className="col-2 text-center">Số tiền</div>
            <div className="col-2 text-center">Thao tác</div>
          </div>
          <div className="body">
            <div className="product-list">
              {cart.length ? (
                cart.map((item, i) => (
                  <div className="row m-0" key={i}>
                    <div className="col-4 product-row row m-0">
                      <div className="col-lg-3 col-md-5 col-sm-6 col-xs-6 text-center fill">
                        <img
                          alt=""
                          src={item.image[0] ? item.image[0].url : ""}
                        ></img>
                      </div>
                      <div className="col-lg-9 col-md-7 col-sm-6 col-xs-6 item-name">
                        {item.name}
                      </div>
                    </div>
                    <div className="col-2 product-row text-center">
                      {formatCurrency(item.price)}đ
                    </div>
                    <div className="col-2 product-row text-center">
                      <TextField
                        InputLabelProps={{
                          classes: {
                            root: classes.resize,
                          },
                        }}
                        placeholder="Số lượng"
                        style={{ width: "50%", textAlign: "center" }}
                        value={item.total}
                        onWheel={(e) => e.target.blur()}
                        onChange={(e) => handleCartChange(item._id, e)}
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
                      />
                    </div>
                    <div className="col-2 product-row text-center price">
                      {formatCurrency(item.total_price)}đ
                    </div>
                    <div className="col-2 product-row text-center">
                      <span
                        className="action"
                        onClick={() => handleOpenConfirmModal(item._id)}
                      >
                        Xóa
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mt-5">
                  Không có sản phẩm nào trong giỏ
                </div>
              )}
            </div>
          </div>
          <div className="receipt-footer">
            {cartInfo && (
              <div className="row ml-0 mr-0 mt-5">
                <div className="col-6 text-center">
                  <Button
                    variant="contained"
                    style={{
                      fontSize: "1.4rem",
                      backgroundColor: "#ff6f64",
                      color: "white",
                    }}
                    disabled={updateBtnSt}
                    onClick={updateCart}
                  >
                    Cập nhật danh sách
                  </Button>
                </div>
                <div className="col-6 text-center">
                  <span className="custom-price">
                    Tổng thanh toán:{" "}
                    <span>{formatCurrency(cartInfo.total_price)}đ</span>
                  </span>
                  <Button
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                    style={{
                      fontSize: "1.4rem",
                      backgroundColor: "#ff6f64",
                      color: "white",
                    }}
                  >
                    Thanh toán
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  resize: {
    fontSize: "1.4rem",
  },
}));

export default Receipt;
