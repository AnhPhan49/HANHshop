import React, {useState} from 'react'
import SaleItemCard from '../sale-item-card'
import anh1 from '../../assets/images_demo/productslide-1.jpg'
import anh2 from '../../assets/images_demo/productslide-2.jpg'
import anh3 from '../../assets/images_demo/productslide-3.jpg'
import anhnho1 from '../../assets/images_demo/thumbnailslide-1.jpg'
import anhnho2 from '../../assets/images_demo/thumbnailslide-2.jpg'
import anhnho3 from '../../assets/images_demo/thumbnailslide-3.jpg'
const Detail = (props) => {
    
    return(
      
<div className="main">
        <div className="content">
         
          <div className="section group">
            <div className="cont-desc span_1_of_2">
              <div className="product-details">				
                <div className="grid images_3_of_2">
                  <div id="container">
                    <div id="products_example">
                      <div id="products">
                        <div className="slides_container">
                          <a href="#" target="_blank"><img src={anh1} alt=" " /></a>
                          <a href="#" target="_blank"><img src={anh2} alt=" " /></a>
                          <a href="#" target="_blank"><img src={anh3} alt=" " /></a>
                        </div>
                        <ul class="pagination ">
                        <li><a href="#" className="v1"><img src={anhnho1} alt=" " /></a></li>
								      	<li><a href="#" className="v1"><img src={anhnho2} alt=" " /></a></li>
								      	<li><a href="#"className="v1"><img src={anhnho3 }alt=" " /></a></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="desc span_3_of_2">
                  <h2>Lorem Ipsum is simply dummy text </h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>					
                  <div className="price">
                    <p>Price: <span>$500</span></p>
                  </div>
                  <div className="available">
                    <p>Available Options :</p>
                    <ul>
                      <li>Color:
                        <select>
                          <option>Silver</option>
                          <option>Black</option>
                          <option>Dark Black</option>
                          <option>Red</option>
                        </select></li>
                      <li>Size:<select>
                          <option>Large</option>
                          <option>Medium</option>
                          <option>small</option>
                          <option>Large</option>
                          <option>small</option>
                        </select></li>
                      <li>Quality:<select>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select></li>
                    </ul>
                  </div>
                  <div className="share-desc">
                  
                    <div className="button"><span><a href="#">Add to Cart</a></span></div>					
                    <div className="clear" />
                  </div>
                  
                </div>
                <div className="clear" />
              </div>
              <div className="product_desc">	
                <div id="horizontalTab">
                  <ul className="resp-tabs-list">
                    <li>Product Details</li>
               
                    <div className="clear" />
                  </ul>
                  <div className="resp-tabs-container">
                    <div className="product-desc">
                      <p>Lorem Ipsum is simply dummy text of the <span>printing and typesetting industry</span>. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
           				</div>
                
                   
                  </div>
                </div>
              </div>
              <div className="content_bottom">
                <div className="heading">
                  <h3>Related Products</h3>
                </div>
                <div className="see">
                  <p><a href="#">See all Products</a></p>
                </div>
                <div className="clear" />
              </div>
              <div className="section group">
                <div className="grid_1_of_4 images_1_of_4">
                  <a href="#"><img src="https://cbu01.alicdn.com/img/ibank/O1CN01kEAcoj1cpHusIuLsR_!!2211230903649-0-cib.jpg" alt="" /></a>					
                  <div className="price" style={{border: 'none'}}>
                    <div className="add-cart" style={{float: 'none'}}>								
                      <h4><a href="#">Add to Cart</a></h4>
                    </div>
                    <div className="clear" />
                  </div>
                </div>
                <div className="grid_1_of_4 images_1_of_4">
                  <a href="#"><img src="https://cbu01.alicdn.com/img/ibank/O1CN01kEAcoj1cpHusIuLsR_!!2211230903649-0-cib.jpg" alt="" /></a>
                  <div className="price" style={{border: 'none'}}>
                    <div className="add-cart" style={{float: 'none'}}>								
                      <h4><a href="#">Add to Cart</a></h4>
                    </div>
                    <div className="clear" />
                  </div>
                </div>
                <div className="grid_1_of_4 images_1_of_4">
                  <a href="#"><img src="https://cbu01.alicdn.com/img/ibank/O1CN01kEAcoj1cpHusIuLsR_!!2211230903649-0-cib.jpg" alt="" /></a>
                  <div className="price" style={{border: 'none'}}>
                    <div className="add-cart" style={{float: 'none'}}>								
                      <h4><a href="#">Add to Cart</a></h4>
                    </div>
                    <div className="clear" />
                  </div>
                </div>
                <div className="grid_1_of_4 images_1_of_4">
                  <img src="https://cbu01.alicdn.com/img/ibank/O1CN01kEAcoj1cpHusIuLsR_!!2211230903649-0-cib.jpg" alt="" />
                  <div className="price" style={{border: 'none'}}>
                    <div className="add-cart" style={{float: 'none'}}>								
                      <h4><a href="#">Add to Cart</a></h4>
                    </div>
                    <div className="clear" />
                  </div>
                </div>
              </div>
            </div>
            <div className="rightsidebar span_3_of_1">
              <h2>CATEGORIES</h2>
              <ul>
                <li><a href="#">Mobile Phones</a></li>
                <li><a href="#">Desktop</a></li>
                <li><a href="#">Laptop</a></li>
                <li><a href="#">Accessories</a></li>
                <li><a href="#">Software</a></li>
                <li><a href="#">Sports &amp; Fitness</a></li>
                <li><a href="#">Footwear</a></li>
                <li><a href="#">Jewellery</a></li>
                <li><a href="#">Clothing</a></li>
                <li><a href="#">Home Decor &amp; Kitchen</a></li>
                <li><a href="#">Beauty &amp; Healthcare</a></li>
                <li><a href="#">Toys, Kids &amp; Babies</a></li>
              </ul>
            
      
            </div>
          </div>
        </div>
      </div>
      
      )
}

export default Detail