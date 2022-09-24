import React from 'react';
import propTypes from 'prop-types';

function OrderStatus({ status, id }) {
  return (
    <div>
      <p data-testid={ `seller_orders__element-delivery-status-${id}` }>
        { status }
      </p>
    </div>
  );
}

OrderStatus.propTypes = {
  status: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
};

export default OrderStatus;
