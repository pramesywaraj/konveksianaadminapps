import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { history } from './Helpers';
import { PrivateRoute } from './Components/PrivateRoute';

import Layout from './Components/Layout/Layout';

function App() {
  return (
    <div>
      <Router history={history}>
        <div>
          <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
