import React from 'react';

function OrderStatus(status, id) {
  return (
    <div>
      <p data-testid={ `seller_orders__element-delivery-status-${id}` }>
        { status }
      </p>
    </div>
  );
}

export default OrderStatus;
