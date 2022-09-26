import React from 'react';
import propTypes from 'prop-types';

function OrderProduct({ userType, item, id, name, quantity, price, totalPrice }) {
  return (
    <>
      <td
        data-testid={ `${userType}_order_details__element-order-table-item-number-${id}` }
      >
        { item }
      </td>
      <td data-testid={ `${userType}_order_details__element-order-table-name-${id}` }>
        { name }
      </td>
      <td data-testid={ `${userType}_order_details__element-order-table-quantity-${id}` }>
        { quantity }
      </td>
      <td
        data-testid={ `${userType}_order_details__element-order-table-unit-price-${id}` }
      >
        { price }
      </td>
      <td
        data-testid={ `${userType}_order_details__element-order-table-sub-total-${id}` }
      >
        { totalPrice(Math.ceil(quantity * price).toFixed(2)) }
        { Math.ceil(quantity * price).toFixed(2) }
      </td>
    </>
  );
}

// 25.654

OrderProduct.propTypes = {
  userType: propTypes.string.isRequired,
  item: propTypes.number.isRequired,
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  quantity: propTypes.number.isRequired,
  price: propTypes.number.isRequired,
  totalPrice: propTypes.func.isRequired,
};

export default OrderProduct;
