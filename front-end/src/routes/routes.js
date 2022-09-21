import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
    </Switch>
  );
}

export default Routes;
