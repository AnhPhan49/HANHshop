import React, { useState, useEffect } from "react";
// import check from "../../assets/check.png";
// import shop from "../../assets/shop.png";
import ShopApi from '../../apis/shopApis'

const Receipt = () => {
  const [cart, setCart] = useState([])
  const [cartTotal, setCartTotal] = useState()

  useEffect(() => {
    getCart()
  }, [])

  const getCart = async () => {
    try {
      const res = await ShopApi.getCart()
      if (res.status === 200) {
        setCart(res.data.product)
        setCartTotal(res.data.total_price)
      }
    } catch(e) {
      console.log(e)
    }
  }

  const formatCurrency = (price) => {
    return price.toLocaleString('it-IT');                
}

  return (
    <div className="main">
      <div className="content">
        <div className="cartoption">
          <div className="cartpage">
            <h2>Giỏ hàng của bạn</h2>
            <table className="tblone">
              <tbody>
                <tr>
                  <th width="20%">Tên sản phẩm</th>
                  <th width="10%">Ảnh</th>
                  <th width="15%">Giá</th>
                  <th width="25%">Số lượng</th>
                  <th width="20%">Thành tiền</th>
                  <th width="10%">Tùy chọn</th>
                </tr>
                {
                  cart && cart.map((item, i) => (
                    <tr key={i}>
                      <td>{item.id.name}</td>
                      <td>
                        {
                          item.id.image[0] && (
                            <img src={item.id.image[0].url} alt="" />
                          )
                        }                        
                      </td>
                      <td>{formatCurrency(item.id.price)}đ</td>
                      <td>
                        <form action method="post">
                          <input type="number" name defaultValue={item.total} />
                          <input
                            type="submit"
                            name="submit"
                            defaultValue="Update"
                          />
                        </form>
                      </td>
                      <td>{formatCurrency(item.total_price)}đ</td>
                      <td>
                        <a href>X</a>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <table style={{ float: "right", textAlign: "left" }} width="40%">
              <tbody>                
                <tr>
                  <th>Tổng cộng:</th>
                  <td>{cartTotal && formatCurrency(cartTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="shopping">
            {/* <div className="shopleft">
              <a href="#">
                {" "}
                <img src={shop} alt="" />
              </a>
            </div>
            <div className="shopright">
              <a href="#">
                {" "}
                <img src={check} alt="" />
              </a>
            </div> */}
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};

export default Receipt;
