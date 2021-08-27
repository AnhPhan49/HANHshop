import React, { useState, useEffect } from "react";
import ShopApi from "../../apis/shopApis";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthPaymentModal from '../authencate-payment-modal'

const Receipt = () => {
  const classes = useStyles();
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState();
  const [openModal, setOpenModal] = useState()

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const res = await ShopApi.getCart();
      if (res.status === 200) {
        setCart(res.data.product);
        setCartTotal(res.data.total_price);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const formatCurrency = (price) => {
    return price.toLocaleString("it-IT");
  };

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div className="production-page">
      <AuthPaymentModal open={openModal} handleClose={handleCloseModal}></AuthPaymentModal>
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
          {cart &&
            cart.map((item, i) => (
              <div className="row m-0" key={i}>
                <div className="col-4 product-row row m-0">
                  <div className="col-lg-3 col-md-5 col-sm-6 col-xs-6 text-center fill">
                    <img
                      alt=""
                      src={item.id.image[0] ? item.id.image[0].url : ""}
                    ></img>
                  </div>
                  <div className="col-lg-9 col-md-7 col-sm-6 col-xs-6 item-name">
                    {item.id.name}
                  </div>
                </div>
                <div className="col-2 product-row text-center">
                  {formatCurrency(item.id.price)}đ
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
                  <span className="action">Xóa</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="receipt-footer">
        <div className="row ml-0 mr-0 mt-5">
          <div className="col-6 text-center">
            <Button
              variant="contained"
              style={{
                fontSize: "1.4rem",
                backgroundColor: "rgba(203,44,49,255)",
                color: "white",
              }}
            >
              Cập nhật danh sách
            </Button>
          </div>
          <div className="col-6 text-center">
            {cartTotal && (
              <span className="custom-price">
                Tổng thanh toán: <span>{formatCurrency(cartTotal)}đ</span>
              </span>
            )}
            <Button
              variant="contained"
              onClick={() => setOpenModal(true)}
              style={{
                fontSize: "1.4rem",
                backgroundColor: "rgba(203,44,49,255)",
                color: "white",
              }}
            >
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  resize: {
    fontSize: "1.4rem",
  },
}));

export default Receipt;
