import React from 'react';
import OrderStatus from './OrderStatus';

function OrderCard(order) {
  const { id, status, date, totalPrice, address } = order;

  return (
    <div>
      <div>
        <p data-testid={ `seller_orders__element-order-id-${id}` }>
          Pedido
          { id }
        </p>
      </div>
      <OrderStatus status={ status } id={ id } />
      <div>
        <p data-testid={ `seller_orders__element-order-date-${id}` }>{date}</p>
        <p data-testid={ `seller_orders__element-card-price-${id}` }>{totalPrice}</p>
        <p data-testid={ `seller_orders__element-card-address-${id}` }>{address}</p>
      </div>
    </div>
  );
}

export default OrderCard;
