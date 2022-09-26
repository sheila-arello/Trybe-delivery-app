import React from 'react';
import propTypes from 'prop-types';

function OrderStatus({ status, id, userType }) {
  // console.log(userType); OK
  return (
    <div>
      <p data-testid={ `${userType}_orders__element-delivery-status-${id}` }>
        { status }
      </p>
    </div>
  );
}

OrderStatus.propTypes = {
  status: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
  userType: propTypes.string.isRequired,
};

export default OrderStatus;
