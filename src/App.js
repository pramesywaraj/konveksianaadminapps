import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';

import Layout from './Components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/dashboard" component={Dashboard}/>          

          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
