import React, {useState} from 'react'
import check from '../../assets/check.png'
import shop from '../../assets/shop.png'
const Receipt = (props) => {
    
    return(

        <div className="main">
        <div className="content">
          <div className="cartoption">		
            <div className="cartpage">
              <h2>Your Cart Detail</h2>
              <table className="tblone">
                <tbody><tr>
                <th width="10%">STT</th>
                    <th width="20%">Product Name</th>
                    <th width="15%">Image</th>
                    <th width="10%">Price</th>
                    <th width="10%">Quantity</th>
                    <th width="15">Total Price</th>
                    <th width="10%">Ngày Đặt</th>
                    <th width="10%">Tình Trạng</th>
                  </tr>
                  <tr>
                  <td>1</td>
                    <td>Product Title</td>
                    <td><img src="images/new-pic3.jpg" alt="" /></td>
                    <td> 20000</td>
                    <td>
                      <form action method="post">
                        <input type="number" name defaultValue={1} />
                        
                      </form>
                    </td>
                    <td>40000</td>
                    <td>17/10/2021 12:20AM</td>
                    <td>Đã Nhận</td>
                  </tr>
                  <tr>
                  <td>2</td>
                    <td>Product Title</td>
                    <td><img src="images/new-pic3.jpg" alt="" /></td>
                    <td>20000</td>
                    <td>
                      <form action method="post">
                        <input type="number" name defaultValue={1} />
                        
                      </form>
                    </td>
                    <td> 40000</td>
                    <td>17/10/2021 12:20AM</td>
                    <td>Đã Gửi Hàng</td>
                  </tr>
                  <tr>
                  <td>3</td>
                    <td>Product Title</td>
                    <td><img src="images/new-pic3.jpg" alt="" /></td>
                    <td>20000</td>
                    <td>
                      <form action method="post">
                        <input type="number" name defaultValue={1} />
                       
                      </form>
                    </td>
                    <td>40000</td>
                    <td>17/10/2021 12:20AM</td>
                    <td>Đã Nhận</td>
                  </tr>
                  <tr>
                  <td>4</td>
                    <td>Product Title</td>
                    <td><img src="images/new-pic3.jpg" alt="" /></td>
                    <td>20000</td>
                    <td>
                      <form action method="post">
                        <input type="number" name defaultValue={1} />
                   
                      </form>
                    </td>
                    <td>40000</td>
                    <td>17/10/2021 12:20AM</td>
                    <td>Đang Xử Lí</td>
                  </tr>
                  <tr>
                  <td>5</td>
                    <td>Product Title</td>
                    <td><img src="images/new-pic3.jpg" alt="" /></td>
                    <td>20000</td>
                    <td>
                      <form action method="post">
                        <input type="number" name defaultValue={1} />
                     
                      </form>
                    </td>
                    <td>40000</td>
                    <td>17/10/2021 12:20AM</td>
                    <td>Đã Nhận</td>
                  </tr>
                </tbody></table>
          
            </div>
            <div className="shopping">
              <div className="shopleft">
                <a href="index.html"> <img src={shop} alt="" /></a>
              </div>
              <div className="shopright">
                <a href="login.html"> <img src={check} alt="" /></a>
              </div>
            </div>
          </div>  	
          <div className="clear" />
        </div>
      </div>
      )
}

export default Receipt