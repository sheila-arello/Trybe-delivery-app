import React from 'react';
import propTypes from 'prop-types';

function OrderStatus({ status, id, userType, orderType }) {
  const index = id - 1;
  // console.log(userType); OK
  return (
    <div>
      {
        orderType === 'orders'
          && (
            <p /* data-testid= 34(customer) e 49(seller) */
              data-testid={ `${userType}_${orderType}__element-delivery-status-${id}` }
              className="font-bold"
            >
              { status }
            </p>
          )
      }
      {
        (orderType === 'order_details' && userType === 'customer')
          ? (
            <p /* data-testid= 40(customer) */
              data-testid={
                `${userType}_${orderType}`
                + `__element-order-details-label-delivery-status-${index}`
              }
              className="font-bold"
            >
              { status }
            </p>
          )
          : (
            <p /* data-testid= 54(seller) */ /* possível conflito de label */
              data-testid={
                `${userType}_${orderType}__element-order-details-label-delivery-status`
              }
              className="font-bold"
            >
              { status }
            </p>
          )
      }
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
