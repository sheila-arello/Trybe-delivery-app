import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Orders from '../pages/orders/Orders';
import Admin from '../pages/admin/Admin';
import Products from '../pages/products/Products';
// import Checkout from '../pages/checkout/Checkout';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={ () => (<Redirect to="/login" />) } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/seller/orders" component={ Orders } />
      <Route exect path="/admin/manage" component={ Admin } />
      <Route exact path="/customer/products" component={ Products } />
      {/* <Route exact path="/customer/checkout" component={ Checkout } /> */}
    </Switch>
  );
}

export default Routes;
