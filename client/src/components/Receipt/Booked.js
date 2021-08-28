import React, { useState, useEffect } from "react";
import ShopApi from "../../apis/shopApis";

const Receipt = () => {
  const [receipt, setReceipt] = useState([]);

  useEffect(() => {
    getReceipt();
  }, []);

  const getReceipt = async () => {
    try {
      const res = await ShopApi.getReceipt(true);
      if (res.status === 200) {
        setReceipt(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const convertTime = (unformatTime) => {
    let date = new Date(unformatTime);
    const formatedTime =
      date.getDate() +
      " / " +
      (date.getMonth() + 1) +
      " / " +
      date.getFullYear();
    return formatedTime;
  };

  const formatCurrency = (price) => {
    return price.toLocaleString("it-IT");
  };

  return (
    <div className="production-page">
      <div style={{ marginLeft: "20px" }}>
        <h3>Lịch sử đơn hàng</h3>
      </div>
      <div className="title row m-0">
        <div className="col-3 text-center">Mã đơn hàng</div>
        <div className="col-3 text-center">Tổng tiền</div>
        <div className="col-3 text-center">Ngày đặt</div>
        <div className="col-3 text-center">Tình trạng</div>
      </div>
      <div className="body">
        <div className="product-list">
          {receipt.length ? (
            receipt.map((ele, index) => (
              <div className="row m-0" key={index}>
                <div className="col-3 product-row text-center">{ele.id_receipt}</div>
                <div className="col-3 product-row text-center price">
                  {formatCurrency(ele.total_price)}đ
                </div>
                <div className="col-3 product-row text-center">
                  {convertTime(ele.createdAt)}
                </div>
                <div className="col-3 product-row text-center">
                  {ele.status.present}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-5">Không có dữ liệu đơn hàng</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Receipt;
