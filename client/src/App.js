import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          </Switch>      
      </Router>
    </Provider>
  );
}

export default App;
