import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Header from '../../components/Header';
import OrderCard from '../../components/OrderCard';
import { requestData, setToken } from '../../services/requests';

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState('');
  const { history: { location: { pathname } } } = props;
  const userType = pathname.includes('products') ? 'products' : 'order';

  async function getOrders() {
    // try {
    const response = await requestData('/seller/orders');
    setOrders(response);
    // } catch (err) {
    //   setOrders([]);
    // }
  }

  useEffect(() => {
    const { token, name } = JSON.parse(localStorage.getItem('info'));
    if (name) { setUserName(name); }
    setToken(token);
    getOrders();
  }, []);

  return (
    <div>
      <Header userType={ userType } userName={ userName } />
      <div>
        { orders.map((order, index) => (
          <OrderCard key={ index } order={ order } />
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
