import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={ () => (<Redirect to="/login" />) } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
    </Switch>
  );
}

export default Routes;
