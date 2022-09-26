import React from 'react';
import propTypes from 'prop-types';

function OrderStatus({ status, id, userType, orderType }) {
  // console.log(userType); OK
  return (
    <div>
      <p data-testid={ `${userType}_${orderType}__element-delivery-status-${id}` }>
        { status }
      </p>
    </div>
  );
}

OrderStatus.propTypes = {
  status: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
  userType: propTypes.string.isRequired,
  orderType: propTypes.string.isRequired,
};

export default OrderStatus;
