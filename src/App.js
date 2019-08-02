import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Navbar /> */}

        <Switch>
          <Route exact path="/login" component={Login}/>
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
