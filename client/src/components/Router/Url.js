

import React, { Component } from 'react';
import {
 
    BrowserRouter as Router,
    Route, 
    Link 
} from "react-router-dom";
import Homepage from '../../views/homepage';
import Contact from '../Contact/Contact';
import Discount from '../Discount/Discount';
import Product from '../Product/Product';
import Booked from '../Receipt/Booked'
import Receipt from '../Receipt/Receipt'
import Detail from '../Product/Detail'
class Url extends Component {
    render() {
        return (
            <div>
                <Route exact path="/"  component={Homepage}/>
                <Route exact path="/product"  component={Product}/>
                
                {/* //news voi detail chung duong dan nhung tu new moi ra detail */}
                <Route exact path="/discount"  component={Discount}/>
                <Route exact path="/contact"  component={Contact}/>
                <Route exact path="/booked"  component={Booked}/>
                <Route exact path="/receipt"  component={Receipt}/>
                <Route exact path="/detail"  component={Detail}/>
            </div>
   
            
        );
    }
}

export default Url;