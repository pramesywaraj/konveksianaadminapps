import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

// With Redux
import { Login } from './Components/Login/Login';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { Order } from './Components/Order/Order';
import { ProductContainer } from './Components/Product/ProductContainer';
import { Client } from './Components/Client/Client';
import { Review } from './Components/Review/Review';

// With React Hooks
import OrderDetailContainer from './Components/Order/OrderDetail/OrderDetailContainer';
import UserContainer from './Components/User/UserContainer';


import { history } from './Helpers';
import { PrivateRoute } from './Components/PrivateRoute';

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' render={() => (<Redirect to="/dashboard" />)} />
                   
          <PrivateRoute exact path='/dashboard' component={Dashboard}/>
          <PrivateRoute exact path='/users' component={UserContainer}/>
          <PrivateRoute exact path='/orders' component={Order}/>
          <PrivateRoute exact path='/orders/:orderId' component={OrderDetailContainer}/>
          <PrivateRoute exact path='/products' component={ProductContainer}/>
          <PrivateRoute exact path='/clients' component={Client}/>
          <PrivateRoute exact path='/reviews' component={Review}/>                                  
        </Switch>
      </Router>
    </div>
  );
}

export default App;
