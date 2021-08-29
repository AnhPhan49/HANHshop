import React, { useState, useEffect } from "react";
import ShopApi from "../../apis/shopApis";
import Tooltip from "@material-ui/core/Tooltip";
import { AiOutlineShoppingCart } from "react-icons/ai";
import LoadingPage from "../../views/loading-page";

const Receipt = () => {
  const [receipt, setReceipt] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    joinData();
    window.scrollTo(0, 0);
  }, []);

  const joinData = async () => {
    setLoader(true);
    const oldReceipt = await getReceipt(false);
    const newReceipt = await getReceipt(true);
    const joinedData = newReceipt.concat(oldReceipt);
    setReceipt(joinedData);
    setLoader(false);
  };

  const getReceipt = async (state) => {
    try {
      const res = await ShopApi.getReceipt(state);
      if (res.status === 200) {
        return res.data;
      }
    } catch (e) {
      console.log(e);
    }
    return [];
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
      {loader ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div>
          <div style={{ marginLeft: "20px" }}>
            <h3>Lịch sử đơn hàng</h3>
          </div>
          <div className="title row m-0">
            <div className="col-2 text-center">Mã đơn hàng</div>
            <div className="col-2 text-center">Tổng tiền</div>
            <div className="col-2 text-center">Ds sản phẩm</div>
            <div className="col-2 text-center">Ngày đặt</div>
            <div className="col-2 text-center">Ngày giao</div>
            <div className="col-2 text-center">Tình trạng</div>
          </div>
          <div className="body">
            <div className="product-list">
              {receipt.length ? (
                receipt.map((ele, index) => (
                  <div className="row m-0" key={index}>
                    <div className="col-2 product-row text-center">
                      {ele.id_receipt}
                    </div>
                    <div className="col-2 product-row text-center price">
                      {formatCurrency(ele.total_price)}đ
                    </div>
                    <div className="col-2 product-row text-center">
                      <Tooltip>
                        <AiOutlineShoppingCart size="22px"></AiOutlineShoppingCart>
                      </Tooltip>
                    </div>
                    <div className="col-2 product-row text-center">
                      {convertTime(ele.createdAt)}
                    </div>
                    <div className="col-2 product-row text-center">
                      Chưa xác định
                    </div>
                    <div className="col-2 product-row text-center">
                      {ele.status.present}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mt-5">
                  Không có dữ liệu đơn hàng
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receipt;
