import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bnb-gallery/dist/style.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { store } from './store'
import { Provider } from 'react-redux'

import Homepage from './views/homepage';
import Login from './views/login'
import AdminPage from './views/admin-page'
import PrivateRoute from './components/private-route'
import Header from './components/header'
import NavBar from './components/navbar';
import Footer from './components/Footer';
import Contact from'./components/Contact/Contact'
import Discount from'./components/Discount/Discount'
import Product from'./components/Product/Product'
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/admin">
              <AdminPage />
            </PrivateRoute>
            <Route path="/" exact>
              <Homepage />
            </Route>
            {/* contact */}
            <Route path="/contact" exact>
              <Header />
              <NavBar/>
              <Contact/>
              <Footer/> 
            </Route>
            {/* endcontact */}
             {/* discount*/}
             <Route path="/discount" exact>
              <Header />
              <NavBar/>
             <Discount/>
              <Footer/> 
            </Route>
            {/* enddiscount */}
              {/* product*/}
              <Route path="/product" exact>
              <Header />
              <NavBar/>
             <Product/>
              <Footer/> 
            </Route>
            {/* product */}

          </Switch>      
      </Router>
    </Provider>
  );
}

export default App;
