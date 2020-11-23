import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {
  Admin,
  Backend,
  Home,
  Login
} from '../index.js';

import { AuthRoute, publicRoutes, adminRoutes, privateRoutes} from '../../routers';

export  function ReactDemo() {
  return (
    <Router>
      <Switch>
        {publicRoutes.map(
          (route) =>  
            <AuthRoute key={route.path} {...route}/>
        )}
        {adminRoutes.map(
          (route) => <AuthRoute key={route.path} {...route} />
        )}
        {privateRoutes.map(
          (route) => <AuthRoute key={route.path} {...route} />
        )}
      </Switch>
    </Router>
  );
}

