import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bnb-gallery/dist/style.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'

import Login from './views/login'
import RegisterPage from './views/register'
import AdminPage from './views/admin-page'
import PrivateRoute from './components/Router/private-route'
import Header from './components/Header/header'
import NavBar from './components/Nav/navbar';
import Footer from './components/Footer/Footer';
import ShopRoute from'./components/Router/shop-route'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>  
      <Router>
        <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <RegisterPage></RegisterPage>
            </Route>
            <PrivateRoute path="/admin">
              <AdminPage/>
            </PrivateRoute>
            <Route>
              <div className='App'> 
                <Header />
                <NavBar/>
                <ShopRoute/>
                <Footer/> 
              </div>                                      
            </Route>                   
          </Switch>      
      </Router>
      </PersistGate> 
    </Provider>
  );
}

export default App;
