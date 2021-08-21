import React, {useState} from 'react'
import check from '../../assets/check.png'
import shop from '../../assets/shop.png'
const Receipt = (props) => {
    
    return(

        <div className="main">
        <div className="content">
          <div className="cartoption">		
            <div className="cartpage">
              <h2>Your Cart</h2>
              <table className="tblone">
                <tbody><tr>
                    <th width="20%">Product Name</th>
                    <th width="10%">Image</th>
                    <th width="15%">Price</th>
                    <th width="25%">Quantity</th>
                    <th width="20%">Total Price</th>
                    <th width="10%">Action</th>
                  </tr>
                  <tr>
                    <td>Product Title</td>
                    <td><img src="images/new-pic3.jpg" alt="" /></td>
                    <td>Tk. 20000</td>
                    <td>
                      <form action method="post">
                        <input type="number" name defaultValue={1} />
                        <input type="submit" name="submit" defaultValue="Update" />
                      </form>
                    </td>
                    <td>Tk. 40000</td>
                    <td><a href>X</a></td>
                  </tr>
                  <tr>
                    <td>Product Title</td>
                    <td><img src="images/new-pic3.jpg" alt="" /></td>
                    <td>Tk. 20000</td>
                    <td>
                      <form action method="post">
                        <input type="number" name defaultValue={1} />
                        <input type="submit" name="submit" defaultValue="Update" />
                      </form>
                    </td>
                    <td>Tk. 40000</td>
                    <td><a href>X</a></td>
                  </tr>
                  <tr>
                    <td>Product Title</td>
                    <td><img src="images/new-pic3.jpg" alt="" /></td>
                    <td>Tk. 20000</td>
                    <td>
                      <form action method="post">
                        <input type="number" name defaultValue={1} />
                        <input type="submit" name="submit" defaultValue="Update" />
                      </form>
                    </td>
                    <td>Tk. 40000</td>
                    <td><a href>X</a></td>
                  </tr>
                  <tr>
                    <td>Product Title</td>
                    <td><img src="images/new-pic3.jpg" alt="" /></td>
                    <td>Tk. 20000</td>
                    <td>
                      <form action method="post">
                        <input type="number" name defaultValue={1} />
                        <input type="submit" name="submit" defaultValue="Update" />
                      </form>
                    </td>
                    <td>Tk. 40000</td>
                    <td><a href>X</a></td>
                  </tr>
                  <tr>
                    <td>Product Title</td>
                    <td><img src="images/new-pic3.jpg" alt="" /></td>
                    <td>Tk. 20000</td>
                    <td>
                      <form action method="post">
                        <input type="number" name defaultValue={1} />
                        <input type="submit" name="submit" defaultValue="Update" />
                      </form>
                    </td>
                    <td>Tk. 40000</td>
                    <td><a href>X</a></td>
                  </tr>
                </tbody></table>
              <table style={{float: 'right', textAlign: 'left'}} width="40%">
                <tbody><tr>
                    <th>Sub Total : </th>
                    <td>TK. 210000</td>
                  </tr>
                  <tr>
                    <th>VAT : </th>
                    <td>TK. 31500</td>
                  </tr>
                  <tr>
                    <th>Grand Total :</th>
                    <td>TK. 241500 </td>
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