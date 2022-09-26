import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Header from '../../components/Header';
import OrderCard from '../../components/OrderCard';
import { requestData, setToken } from '../../services/requests';

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState('');
  const { history: { location: { pathname } } } = props;
  const screenType = pathname.includes('products') ? 'products' : 'order';
  const userType = pathname.includes('customer') ? 'customer' : 'seller';

  // /customer/products
  // /customer/order
  // /seller/products
  // /seller/order

  async function getOrders() {
    const response = await requestData(`/${userType}/orders`);
    setOrders(response);
  }

  useEffect(() => {
    const { token, name } = JSON.parse(localStorage.getItem('info'));
    if (name) { setUserName(name); }
    setToken(token);
    getOrders();
  }, []);

  return (
    <div>
      <Header screenType={ screenType } userName={ userName } userType={ userType } />
      <div>
        { orders.map((order, index) => (
          <OrderCard key={ index } order={ order } userType={ userType } />
        ))}
      </div>
    </div>
  );
}

Orders.propTypes = {
  history: propTypes.shape({
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Orders;
