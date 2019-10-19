import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import { Login } from './Components/Login/Login';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { Order } from './Components/Order/Order';
import { Product } from './Components/Product/Product';
import { Client } from './Components/Client/Client';
import { Review } from './Components/Review/Review';


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
          <PrivateRoute exact path='/orders' component={Order}/>
          <PrivateRoute exact path='/products' component={Product}/>
          <PrivateRoute exact path='/clients' component={Client}/>
          <PrivateRoute exact path='/reviews' component={Review}/>                                  
        </Switch>
      </Router>
    </div>
  );
}

export default App;
