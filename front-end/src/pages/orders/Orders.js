import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import OrderCard from '../../components/OrderCard';
import { requestData } from '../../services/requests';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      // try {
      const response = await requestData('/seller/orders');
      setOrders(response);
      // } catch (err) {
      //   setOrders([]);
      // }
    }
    getOrders();
  }, []);

  return (
    <div>
      <Header />
      <div>
        { orders.map((order, index) => (
          <OrderCard key={ index } order={ order } />
        ))}
      </div>
    </div>
  );
}

export default Orders;
