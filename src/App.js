import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Navbar /> */}

        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/" component={Dashboard}/>          

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
