import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { Order } from './Components/Order/Order';
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
          <PrivateRoute exact path='/order' component={Order}/>          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
