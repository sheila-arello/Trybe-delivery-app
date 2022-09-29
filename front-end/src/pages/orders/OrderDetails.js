import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Header from '../../components/Header';
import OrderHeader from '../../components/OrderHeader';
import OrderProduct from '../../components/OrderProduct';

function OrderDetails(props) {
  const [order, setOrder] = useState({});
  const [userName, setUserName] = useState('');
  const [totalPrice, setTotalPrice] = useState([]);
  const { history: { location: { pathname } } } = props;
  const screenType = pathname.includes('products') ? 'products' : 'order';
  const userType = pathname.includes('customer') ? 'customer' : 'seller';
  const orderType = 'order_details';

  async function getOrder() {
    const pathnameArray = pathname.split('/');
    const orderId = pathnameArray[pathnameArray.length - 1];
    console.log(orderId);
    const response = await requestData(`/${userType}/orders/${orderId}`);
    setOrder(response);
  }

  useEffect(() => {
    const { token, name } = JSON.parse(localStorage.getItem('user'));
    if (name) { setUserName(name); }
    setToken(token);
    getOrder();
  }, []);

  return (
    <div>
      <Header screenType={ screenType } userName={ userName } userType={ userType } />
      <OrderHeader userType={ userType } order={ order } orderType={ orderType } />
      <ul>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
        { order.map((product, index) => (
          <tr key={ index }>
            <OrderProduct
              userType={ userType }
              item={ index }
              id={ product.id }
              name={ product.name }
              quantity={ product.quantity }
              price={ product.price }
              totalPrice={ setTotalPrice }
              orderType={ orderType }
            />
          </tr>
        ))}
        <span data-testid={ `${userType}_${orderType}__element-order-total-price` }>
          { totalPrice.reduce((acc, cur) => acc + cur) }
        </span>
      </ul>
    </div>
  );
}

OrderDetails.propTypes = {
  history: propTypes.shape({
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default OrderDetails;
