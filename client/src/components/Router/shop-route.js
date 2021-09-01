import React, { Component } from 'react';
import {
    Route,
    Switch  
} from "react-router-dom";

import Homepage from '../../views/homepage';
import Contact from '../Contact/Contact';
import Discount from '../Discount/Discount';
import Product from '../Product/Product';
import Booked from '../Receipt/Booked'
import Receipt from '../Receipt/Receipt'
import Detail from '../Product/Detail'
import PageNotFound from '../../views/page-not-found'
class ShopRoute extends Component {
    render() {
        return (
            <Switch> 
                <Route exact path="/"  component={Homepage}/>
                <Route path="/product"  component={Product}/>
                <Route path="/search/:ed"  component={Product}/>
                <Route path="/category/:id"  component={Product}/>
                {/* //news voi detail chung duong dan nhung tu new moi ra detail */}
                <Route path="/discount"  component={Discount}/>
                <Route path="/contact"  component={Contact}/>
                <Route path="/booked"  component={Booked}/>
                <Route path="/receipt"  component={Receipt}/>
                <Route path="/detail/:id"  component={Detail}/> 
                <Route path="*" component={PageNotFound}></Route>       
            </Switch>
        );
    }
}

export default ShopRoute;