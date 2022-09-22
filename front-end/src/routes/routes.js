import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/login/Login';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={ () => (<Redirect to="/login" />) } />
      <Route path="*" component={ Login } />
    </Switch>
  );
}

export default Routes;
